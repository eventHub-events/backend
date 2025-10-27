import { EventModerationEntity } from "../../entities/admin/EventModerationEntity";
import { EventEntity } from "../../entities/organizer/EventEntity";
import { EventStatus } from "../../enums/organizer/events";

export interface IEventStatusCalculatorClass {
  compute(event: EventEntity, moderation:EventModerationEntity):EventStatus
}