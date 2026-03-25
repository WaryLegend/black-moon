import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';

interface ActivationPayload {
  to: string;
  name?: string | null;
  code: string;
}

interface ActivationLinkPayload {
  to: string;
  name?: string | null;
  activationKey: string;
}

interface ResetCodePayload {
  to: string;
  name?: string | null;
  code: string;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly fromEmail: string;
  private readonly baseUrl: string;
  private readonly apiKey?: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey = this.config.get<string>('SENDGRID_API_KEY');
    this.fromEmail =
      this.config.get<string>('SENDGRID_FROM_EMAIL') ??
      'no-reply@blackmoon.app';
    this.baseUrl =
      this.config.get<string>('APP_BASE_URL') ?? 'http://localhost:3000';

    if (this.apiKey) {
      sgMail.setApiKey(this.apiKey);
    } else {
      this.logger.warn(
        'SENDGRID_API_KEY is not configured. Emails will be skipped.',
      );
    }
  }

  async sendActivationCodeEmail(payload: ActivationPayload): Promise<void> {
    await this.sendMail({
      to: payload.to,
      subject: '[BLACK&MOON] ACTIVATE YOUR ACCOUNT',
      html: this.buildCodeTemplate({
        greeting: this.resolveName(payload.name ?? payload.to),
        headline: 'Your activation code',
        code: payload.code,
        description:
          'Use the following code to activate your account. This code expires in 15 minutes.',
      }),
    });
  }

  async sendActivationEmail(payload: ActivationLinkPayload): Promise<void> {
    const activationLink = `${this.baseUrl}/auth/activate?key=${encodeURIComponent(payload.activationKey)}`;
    await this.sendMail({
      to: payload.to,
      subject: '[BLACK&MOON] Activate your account',
      html: this.buildLinkTemplate({
        greeting: this.resolveName(payload.name ?? payload.to),
        headline: 'Activate your account',
        link: activationLink,
        ctaLabel: 'Activate account',
        description:
          'Click the button below to verify your email address and activate your account.',
      }),
    });
  }

  async sendResetCodeEmail(payload: ResetCodePayload): Promise<void> {
    await this.sendMail({
      to: payload.to,
      subject: '[BLACK&MOON] Recover your password',
      html: this.buildCodeTemplate({
        greeting: this.resolveName(payload.name ?? payload.to),
        headline: 'Password recovery code',
        code: payload.code,
        description:
          'Enter this code in the app to verify your identity. The code stays valid for 15 minutes.',
      }),
    });
  }

  private async sendMail(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    if (!this.apiKey) {
      this.logger.warn(
        `Skipping email to ${options.to} because SENDGRID_API_KEY is missing.`,
      );
      return;
    }

    try {
      await sgMail.send({
        to: options.to,
        from: this.fromEmail,
        subject: options.subject,
        html: options.html,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to send email to ${options.to}: ${message}`);
    }
  }

  private buildCodeTemplate(params: {
    greeting: string;
    headline: string;
    code: string;
    description: string;
  }): string {
    return `
      <div style="font-family: Arial, sans-serif; color:#111827;">
        <h2>${params.headline}</h2>
        <p>Hi ${params.greeting},</p>
        <p>${params.description}</p>
        <div style="font-size:32px;font-weight:700;letter-spacing:6px;margin:24px 0;">${params.code}</div>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `;
  }

  private buildLinkTemplate(params: {
    greeting: string;
    headline: string;
    link: string;
    ctaLabel: string;
    description: string;
  }): string {
    return `
      <div style="font-family: Arial, sans-serif; color:#111827;">
        <h2>${params.headline}</h2>
        <p>Hi ${params.greeting},</p>
        <p>${params.description}</p>
        <p style="margin:24px 0;">
          <a href="${params.link}" style="background-color:#111827;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;">${params.ctaLabel}</a>
        </p>
        <p>If the button does not work, copy and paste this link into your browser:</p>
        <p><a href="${params.link}">${params.link}</a></p>
      </div>
    `;
  }

  private resolveName(name: string): string {
    return name?.trim().length ? name : 'there';
  }
}
