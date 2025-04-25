import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendRegisterNotificationMail = async (
  smtpTransport: SMTPTransport.Options,
  recipientEmails: string[],
  body: Record<string, string | undefined>
) => {
  const transporter = createTransport(smtpTransport);
  try {
    const sentMail = await transporter.sendMail({
      from: `heritage.africa <${smtpTransport.auth!.user}>`,
      to: recipientEmails.join(", "),
      subject: `[Heritage Notification] New Registration`,
      text: `New user registration:\n${JSON.stringify(body, null, 2)}`
    });

    console.log("Sent registration notification mail: %s", sentMail.messageId);
    return true;
  } catch (err) {
    console.log(err, "ERROR: Failed to send registration notification mail");
    return false;
  } finally {
    transporter.close();
  }
};

export const sendWelcomeMail = async (
  smtpTransport: SMTPTransport.Options,
  args: { email: string; language: string; firstName: string; lastName: string },
  bccRecipients?: string[]
) => {
  const transporter = createTransport(smtpTransport);
  try {
    const sentMail = await transporter.sendMail({
      from: `heritage.africa <${smtpTransport.auth!.user}>`,
      to: args.email,
      subject: getSignupSubject(args.language),
      text: getSignupText({
        lang: args.language,
        name: `${args.firstName} ${args.lastName}`
      }),
      bcc: bccRecipients
    });

    console.log("Sent welcome mail: %s", sentMail.messageId);
    return true;
  } catch (err) {
    console.log(err, "ERROR: Failed to welcome mail");
    return false;
  } finally {
    transporter.close();
  }
};

function getSignupSubject(lang?: string) {
  if (lang === "en") return "Welcome to Heritage";
  return "Bienvenue chez Heritage";
}

function getSignupText({ lang, name }: { lang: string; name: string }) {
  if (lang === "en") {
    return `
  Hello ${name},
  
  Thank you for your interest to be part of the Heritage community.
  
  Our team is currently processing your request and will be in touch as soon as possible.
  
  We appreciate the opportunity to serve you on our heritage web services.
  
  
  The Heritage Support Team`;
  }

  return `
  Bonjour ${name},
  
  Merci de votre intérêt à faire partie de la communauté Heritage.
  
  Notre équipe traite actuellement votre demande et vous contactera dans les plus brefs délais.
  
  Nous apprécions l'opportunité de vous servir sur les services web d'Heritage.
  
  
  Equipe Support Heritage`;
}
