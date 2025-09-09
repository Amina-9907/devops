import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import services from "@/utils/services";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getHubUrl } from "@/lib/config";

const serviceId = "software-as-a-service";
const service = services.find((service) => service.id === serviceId)!;

const features = [
  "Subscription-based pricing model",
  "Automatic updates and maintenance",
  "Enterprise-grade security and compliance",
  "Seamless integration with existing systems",
  "Scalable resources based on demand",
  "24/7 technical support"
];
const useCases = [
  "Business process automation",
  "Data analytics and business intelligence",
  "Customer relationship management",
  "Enterprise resource planning"
];

const saasOptions = [
  {
    id: "odoo",
    title: "Odoo",
    description:
      "All-in-one business management software with CRM, e-commerce, accounting, and more",
    icon: "/saas/odoo-logo.png",
    features: [
      "CRM and sales management",
      "Inventory and warehouse management",
      "Accounting and financial management",
      "E-commerce platform",
      "Human resources management",
      "Manufacturing resource planning"
    ]
  },
  {
    id: "dolibarr",
    title: "Dolibarr",
    description: "Open-source ERP and CRM for small and medium businesses",
    icon: "/saas/dolibarr-logo.png",
    features: [
      "Customer relationship management",
      "Supplier management",
      "Product and stock management",
      "Banking and financial management",
      "Human resources management",
      "Project management"
    ]
  },
  {
    id: "alfresco",
    title: "Alfresco",
    description:
      "Enterprise content management platform for document management and collaboration",
    icon: "/saas/alfresco-logo.png",
    features: [
      "Document management",
      "Business process automation",
      "Records management",
      "Team collaboration",
      "Content governance",
      "Enterprise search"
    ]
  },
  {
    id: "nextcloud",
    title: "Nextcloud",
    description:
      "Self-hosted productivity platform with file sharing, communication, and collaboration tools",
    icon: "/saas/nextcloud-logo.png",
    features: [
      "File sharing and synchronization",
      "Calendar and contacts management",
      "Video conferencing",
      "Collaborative document editing",
      "Task management",
      "End-to-end encryption"
    ]
  }
];
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(serviceId);
  return { title: t("title") };
}

export default async function ServiceDetail() {
  const t = await getTranslations(serviceId);
  const hubUrl = getHubUrl();

  return (
    <div className="flex min-h-screen flex-col abstract-bg-alt">
      <Navbar />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <Link
            href="/services"
            className="inline-flex items-center text-sm font-medium text-primary mb-6 hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("Back to Services")}
          </Link>

          <div className="flex flex-col md:flex-row gap-8 my-[50px]">
            <div className="flex items-center justify-center p-6 bg-gray-100 rounded-lg md:w-1/4">
              <service.Icon className="h-12 w-12 text-primary" />
            </div>
            <div className="md:w-3/4">
              <h1 className="text-3xl font-bold mb-4 text-foreground">{t("title")}</h1>
              <p className="text-lg text-foreground/50 mb-6">{t("longDescription")}</p>
              <Link href={`${hubUrl}/applications`}>
                <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                  {t("Access")} {t("title")}
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="features">{t("Features")}</TabsTrigger>
              <TabsTrigger value="use-cases">{t("Use Cases")}</TabsTrigger>
            </TabsList>
            <TabsContent
              value="features"
              className="p-4 shadow-sm rounded-lg glass-bg-alt-2">
              <h3 className="text-xl font-light mb-4 hidden">{t("Key Features")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                    <span className="text-gray-600">{t(feature)}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent
              value="use-cases"
              className="p-4 shadow-sm rounded-lg glass-bg-alt-2">
              <h3 className="text-xl font-light mb-4 hidden">{t("Common Use Cases")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                        <span className="text-gray-700">{t(useCase)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/*  Section */}
          <div className="mt-12">
            <p className="text-lg text-foreground/80 mb-6">{t("Software Options")}</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {saasOptions.map((option) => (
                <Card
                  key={option.id}
                  className="glass-bg-alt-2 shadow-sm hover:shadow-md cursor-default transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex flex-col h-full">
                      <div className="flex flex-col items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center mb-2">
                          <Image
                            src={option.icon || "/placeholder.svg"}
                            alt={option.title}
                            width={64}
                            height={64}
                            className="object-contain"
                          />
                        </div>
                        <h4 className="font-medium text-lg text-center">
                          {option.title}
                        </h4>
                      </div>
                      <p className="text-sm text-foreground/60 mb-3">
                        {option.description}
                      </p>
                      <div className="text-sm">
                        <h5 className="font-medium mb-2">{t("Key Features")}:</h5>
                        <ul className="space-y-1">
                          {option.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/*  */}
        </div>
      </main>
    </div>
  );
}
