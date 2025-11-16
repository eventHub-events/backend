import { SubscriptionMapper } from "../../../application/mapper/admin/SubscriptionMapper";
import { CreateSubscriptionPlanUseCase } from "../../../application/useCases/admin/subscription-plans/CreateSubscriptionPlanUseCase";
import { FetchSubscriptionPlansUseCase } from "../../../application/useCases/admin/subscription-plans/FetchSubscriptionPlansUseCase";
import { UpdateSubscriptionPlanStatusUseCase } from "../../../application/useCases/admin/subscription-plans/UpdateSubscriptionPlanStatusUseCase";
import { UpdateSubscriptionPlansUseCase } from "../../../application/useCases/admin/subscription-plans/UpdateSubscriptionPlansUseCase";
import { SubscriptionEntityFactory } from "../../../infrastructure/factories/admin/SubscriptionEntityFactory";
import { SubscriptionPlansRepository } from "../../../infrastructure/repositories/admin/SubscriptionPlansRepository";
import { SubscriptionPlansManagementController } from "../../../interfaceAdapter/controllers/admin/SubscriptionPlansManagementController";
import { SubscriptionPlansRetrievalController } from "../../../interfaceAdapter/controllers/admin/SubscriptionPlansRetrievalController";

const subscriptionPlansEntityFactory = new SubscriptionEntityFactory();
const subscriptionPlansRepository = new SubscriptionPlansRepository(subscriptionPlansEntityFactory);
const subscriptionPlansMapper = new SubscriptionMapper();

const createSubscriptionPlanUseCase = new CreateSubscriptionPlanUseCase(subscriptionPlansRepository, subscriptionPlansMapper);
const updateSubscriptionPlanUseCase = new UpdateSubscriptionPlansUseCase(subscriptionPlansRepository, subscriptionPlansMapper);
const updateSubscriptionPlanStatusUseCase = new UpdateSubscriptionPlanStatusUseCase(subscriptionPlansRepository);
export const subscriptionPlansManagementController = new SubscriptionPlansManagementController(createSubscriptionPlanUseCase, updateSubscriptionPlanUseCase, updateSubscriptionPlanStatusUseCase);

const fetchSubscriptionPlansUseCase = new FetchSubscriptionPlansUseCase(subscriptionPlansRepository, subscriptionPlansMapper);
export const subscriptionPlansRetrievalController = new SubscriptionPlansRetrievalController(fetchSubscriptionPlansUseCase);
