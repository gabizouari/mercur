import {
  ModuleProvider,
  Modules
} from "@medusajs/framework/utils"
import ResendNotificationProviderService from "./service"
export * from "./types";

export default ModuleProvider(Modules.NOTIFICATION, {
  services: [ResendNotificationProviderService],
})
