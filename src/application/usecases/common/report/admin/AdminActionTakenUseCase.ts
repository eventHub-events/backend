import { ReportActions, ReportStatus } from "../../../../../domain/enums/common/report";
import { NotFoundError } from "../../../../../domain/errors/common";
import { IReportRepository } from "../../../../../domain/repositories/common/IReportRepository";
import { IEventRepository } from "../../../../../domain/repositories/organizer/IEventsRepository";
import { IUserRepository } from "../../../../../domain/repositories/user/IUserRepository";
import { IReportModerationEmailTemplate } from "../../../../../infrastructure/interface/Templates/IReportModerationEmailTemplate";
import { AdminActionDTO } from "../../../../DTOs/common/report/AdminReportActionDTO";
import { IAdminActionTakenUseCase } from "../../../../interface/useCases/common/report/admin/IAdminActionTakenUseCase";
import { IEmailService } from "../../../../interface/useCases/user/IEmailService";

export class AdminActionTakenUseCase implements IAdminActionTakenUseCase {
  constructor(
       private _reportRepo: IReportRepository,
       private _eventRepo : IEventRepository,
       private _userRepo : IUserRepository,
       private _templateService : IReportModerationEmailTemplate,
       private _sentMail : IEmailService,

  ){}
  async execute(data: AdminActionDTO): Promise<string> {
      const report = await this._reportRepo.findReportById(data.reportId);
     if(!report) throw new NotFoundError("Report not found");

     let targetEmail  = "";
     let targetName = "";

         // FOR REPORTING USER //

       if(report.targetType === "user"){
         const user = await this._userRepo.findUserById(report.targetId);
          if(!user) throw new NotFoundError("user not found");
          targetEmail  = user.email;
          targetName = user.name;
              
          if(data.action === ReportActions.BLOCK) {
              user?.block();
             const isBlocked = user.isBlocked;
            await this._userRepo.updateUser(report.targetId,{isBlocked});
          }
       }
 
      // FOR REPORTING ORGANIZER //

       if(report.targetType === "organizer") {

           const organizer = await this._userRepo.findUserById(report.targetId);
                 if(!organizer) throw new NotFoundError("organizer not found");
                        targetEmail = organizer.email;
                        targetName = organizer.name;

            if(data.action === "block"){
               organizer?.block();
               const blocked = organizer?.isBlocked;
              await this._userRepo.updateUser(report.targetId,{isBlocked: blocked});
            }

           if(data.action === "warn") {
             const email = this._templateService.organizerWarningEmail({
                         organizerName: targetName   ,
                         adminNote : data.adminNote!      
                            });
            
               await this._sentMail.sendMail(
                       targetEmail,
                       email.subject,
                       email.html
                 );
           }
       }

      // FOR REPORTING EVENT //

     if(report.targetType === "event"){

         const event = await this._eventRepo.findEventById(report.targetId);
         if(!event) throw new NotFoundError("Event not found");

         const organizer = await this._userRepo.findUserById(event.organizerId.toString());
                if(!organizer) throw new NotFoundError("organizer not found");
                     targetEmail = organizer.email;
                     targetName = organizer.name;
                    
                       if(data.action === "block"){
               organizer?.block();
               const blocked = organizer?.isBlocked;
              await this._userRepo.updateUser(report.targetId,{isBlocked: blocked});
            }

           if(data.action === "warn") {
             const email = this._templateService.organizerWarningEmail({
                         organizerName: targetName   ,
                         adminNote : data.adminNote!      
                            });
            
               await this._sentMail.sendMail(
                       targetEmail,
                       email.subject,
                       email.html
                 );
           }
        }


      if(data.action === "block"){
          const email = this._templateService.blockActionEmail({
              name: targetName,
              targetType: report.targetType,
              adminNote: data.adminNote!

              });

          await this._sentMail.sendMail(
              targetEmail,
              email.subject,
              email.html
          )
      }
   
       report .update({
           status: ReportStatus.ACTION_TAKEN,
           action : data.action,
           adminNote: data.adminNote,
           updatedAt: new Date()
       });

       await this._reportRepo.updateReport(data.reportId,report);
   return "Report update successful"
     
  }
}
