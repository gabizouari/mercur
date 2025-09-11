// in src/services/resend.ts

import { AbstractNotificationService, TransactionBaseService } from "@medusajs/medusa"
import { Resend } from "resend"

class ResendService extends AbstractNotificationService {
    static identifier = "resend"

    protected resend_: Resend
    protected from_: string

    constructor(container, options) {
        super(container)
        this.resend_ = new Resend(options.api_key)
        this.from_ = options.from
    }

    async sendNotification(
        eventName: string,
        data: any,
        channel: string
    ): Promise<{
        to: string;
        status: string;
        data: Record<string, unknown>;
    }> {

        if (eventName === "order.placed") {
            const sent = await this.resend_.emails.send({
                from: this.from_,
                to: data.order.email,
                subject: "Your order is confirmed!",
                html: `<h1>Order #${data.order.display_id} Confirmed</h1><p>Thank you for your purchase.</p>`,
            })

            return {
                to: data.order.email,
                status: "sent",
                data: sent,
            }
        }

        return {
            to: "",
            status: "failed",
            data: {
                eventName,
                message: "Event not supported"
            },
        }
    }

    async resendNotification(
        notification: any,
        config: any,
        attachmentGenerator: any
    ): Promise<{
        to: string;
        status: string;
        data: Record<string, unknown>;
    }> {
        // This example does not support resending, but you can implement it here
        return {
            to: config.to,
            status: "failed",
            data: {
                message: "Resending not supported."
            }
        }
    }
}

export default ResendService
