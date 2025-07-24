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
      to: recipientEmails.join(", "), // list of receivers
      subject: `[Heritage Notification] New Registration`, // Subject line
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

// Subscribe


export const sendSubscribeWelcomeMail = async (
  smtpTransport: SMTPTransport.Options,
  args: { email: string; language: string; firstName: string; lastName: string },
  bccRecipients?: string[]
) => {
  const transporter = createTransport(smtpTransport);
  try {
    const sentMail = await transporter.sendMail({
      to: args.email,
      subject: getSubscribeSubject(args.language),
      text: getSubscribeText({ lang: args.language }),
      bcc: bccRecipients
    });
    console.log("Sent subscribe welcome mail: %s", sentMail.messageId);
    return true;
  } catch (err) {
    console.log(err, "ERROR: Failed to send subscribe welcome mail");
    return false;
  } finally {
    transporter.close();
  }
};

function getSubscribeSubject(lang?: string) {
  if (lang === "en") return "Welcome to Heritage Newsletter";
  return "Bienvenue dans la newsletter Heritage";
}

function getSubscribeText({ lang }: { lang: string }) {
  if (lang === "en") {
    return `
Hello,

Thank you for subscribing to the Heritage newsletter!

We're excited to have you join our community. You'll receive our latest updates, news, and exclusive content directly in your inbox.

Stay tuned for our upcoming newsletters featuring insights about heritage web services, industry trends, and exclusive offers.

If you have any questions, feel free to contact us.

Best regards,
The Heritage Team

---
If you wish to unsubscribe, please contact us and we'll remove you from our mailing list.`;
  }

  return `
Bonjour,

Merci de vous être abonné(e) à la newsletter Heritage !

Nous sommes ravis de vous accueillir dans notre communauté. Vous recevrez nos dernières actualités, nouveautés et contenus exclusifs directement dans votre boîte mail.

Restez à l'écoute pour nos prochaines newsletters avec des informations sur les services web d'Heritage, les tendances du secteur et des offres exclusives.

Si vous avez des questions, n'hésitez pas à nous contacter.

Cordialement,
L'équipe Heritage

---
Si vous souhaitez vous désabonner, contactez-nous et nous vous retirerons de notre liste de diffusion.`;
}
