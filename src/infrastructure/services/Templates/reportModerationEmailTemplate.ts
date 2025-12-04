import { ReportTypes } from "../../../domain/enums/common/report";
import { IReportModerationEmailTemplate } from "../../interface/Templates/IReportModerationEmailTemplate";
import { TargetPerson } from "../../types/report/report";

export class ReportModerationEmailTemplate  implements IReportModerationEmailTemplate {
  organizerWarningEmail(params: { organizerName: string; adminNote: string; }): {subject:string, html:string} {
            
         return {
      subject: "⚠️ Warning from EventHub Trust & Safety Team",
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
          <h2>Hello ${params.organizerName},</h2>

          <p>
            We have identified an issue related to your 
            <strong>organizer activity</strong> on <strong>EventHub</strong>.
          </p>

          <p>
            A user has reported one of your events or organizer activities
            for violating our community or platform guidelines.
          </p>

          <p style="margin-top: 16px;">
            <strong>Admin Message:</strong>
          </p>

          <div style="
            background-color: #f8f9fa;
            border-left: 4px solid #f59e0b;
            padding: 12px;
            margin: 8px 0;
          ">
            ${params.adminNote}
          </div>

          <p>
            This is a <strong>formal warning</strong>.
            Continued violations may result in
            <strong>temporary suspension</strong> or
            <strong>permanent blocking</strong> of your organizer account.
          </p>

          <p>
            If you believe this report is incorrect,
            you may contact our support team for further clarification.
          </p>

          <p style="margin-top: 24px;">
            Regards,<br/>
            <strong>EventHub Trust & Safety Team</strong>
          </p>
        </div>
      `,
    };
  }
  blockActionEmail(params: { name: string; targetType: ReportTypes; adminNote: string; }): {subject:string, html:string}{
         const isEvent = params.targetType === "event";
              return {
      subject: isEvent
        ? "🚫 Event Blocked by EventHub"
        : "🚫 Organizer Account Blocked by EventHub",

      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
          <h2>Hello ${params.name},</h2>

          <p>
            After careful review, the EventHub Trust & Safety Team has taken
            action on your <strong>${isEvent ? "event" : "organizer account"}</strong>
            due to repeated or serious violations of our platform policies.
          </p>

          <p>
            <strong style="color:#dc2626;">
              This ${isEvent ? "event" : "organizer account"} has been blocked.
            </strong>
          </p>

          <p style="margin-top: 16px;">
            <strong>Admin Message:</strong>
          </p>

          <div style="
            background-color: #fef2f2;
            border-left: 4px solid #dc2626;
            padding: 12px;
            margin: 8px 0;
          ">
            ${params.adminNote}
          </div>

          ${
            isEvent
              ? `
                <p>
                  Blocking this event means it is no longer visible or accessible
                  to users on EventHub.
                </p>
              `
              : `
                <p>
                  While your organizer account is blocked, you will not be able
                  to create or manage events on EventHub.
                </p>
              `
          }

          <p>
            If you believe this action was taken in error, you may submit an appeal
            by contacting our support team.
          </p>

          <p>
            Continued violations may result in permanent removal from the EventHub platform.
          </p>

          <p style="margin-top: 24px;">
            Regards,<br/>
            <strong>EventHub Trust & Safety Team</strong>
          </p>
        </div>
      `,
    };
  }
  chatWarningEmail(params: { name: string; role: TargetPerson; adminNote: string; }): { subject: string; html: string; } {
               return {
    subject: "⚠️ Warning for Inappropriate Chat Behavior on EventHub",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
        <h2>Hello ${params.name},</h2>

        <p>
          We have reviewed a report regarding your recent
          <strong>chat messages</strong> on EventHub.
        </p>

        <p>
          A message sent by your ${params.role} account
          was found to violate our communication guidelines.
        </p>

        <p style="margin-top: 16px;">
          <strong>Admin Message:</strong>
        </p>

        <div style="
          background-color: #f8f9fa;
          border-left: 4px solid #f59e0b;
          padding: 12px;
          margin: 8px 0;
        ">
          ${params.adminNote}
        </div>

        <p>
          This is a <strong>formal warning</strong>.
          Continued violations may result in temporary suspension
          or permanent blocking of your account.
        </p>

        <p>
          Please ensure respectful communication within EventHub chats.
        </p>

        <p style="margin-top: 24px;">
          Regards,<br/>
          <strong>EventHub Trust & Safety Team</strong>
        </p>
      </div>
    `,
  };
  }
  chatBlockEmail(params: { name: string; role: "user" | "organizer"; adminNote: string; }): { subject: string; html: string; } {
               return {
    subject: "🚫 Account Blocked Due to Chat Violations on EventHub",
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;">
        <h2>Hello ${params.name},</h2>

        <p>
          After a thorough review, the EventHub Trust & Safety Team has taken action
          due to repeated or severe violations in chat communications.
        </p>

        <p>
          <strong style="color:#dc2626;">
            Your ${params.role} account has been blocked.
          </strong>
        </p>

        <p style="margin-top: 16px;">
          <strong>Admin Message:</strong>
        </p>

        <div style="
          background-color: #fef2f2;
          border-left: 4px solid #dc2626;
          padding: 12px;
          margin: 8px 0;
        ">
          ${params.adminNote}
        </div>

        <p>
          This action restricts your ability to participate in chats
          and other platform activities.
        </p>

        <p>
          If you believe this action was taken in error,
          you may contact our support team to appeal.
        </p>

        <p style="margin-top: 24px;">
          Regards,<br/>
          <strong>EventHub Trust & Safety Team</strong>
        </p>
      </div>
    `,
  };
  }
}