import {
  Archive,
  ArchiveRestore,
  ArrowLeft,
  CheckCircle2,
  Database,
  Globe
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import services from "@/utils/services";
import { getTranslations } from "next-intl/server";
import { getHubUrl } from "@/lib/config";

const serviceId = "s3-object-storage";
const service = services.find((service) => service.id === serviceId)!;

const features = [
  "Unlimited storage capacity",
  "Pay-as-you-go pricing model",
  "Data encryption at rest and in transit",
  "Versioning and lifecycle management",
  "Multi-region replication",
  "Access control and permissions"
];
const useCases = [
  "Backup and recovery",
  "Big data analytics",
  "Content distribution",
  "Data archiving"
];

const storageOptions = [
  {
    id: "standard",
    title: "Standard Storage",
    description: "General-purpose storage for frequently accessed data",
    icon: <Database className="h-10 w-10 text-primary" />,
    features: [
      "High durability and availability",
      "Low-latency access",
      "Unlimited storage capacity",
      "Versioning support",
      "Lifecycle management",
      "Access control policies"
    ]
  },
  {
    id: "infrequent-access",
    title: "Infrequent Access",
    description: "Lower cost storage for less frequently accessed data",
    icon: <Archive className="h-10 w-10 text-primary" />,
    features: [
      "Cost-effective for infrequent access",
      "Rapid retrieval times",
      "Same durability as standard storage",
      "Minimum storage duration",
      "Retrieval fees",
      "Automatic tiering options"
    ]
  },
  {
    id: "archive",
    title: "Archive Storage",
    description: "Lowest cost storage for data archiving and long-term backup",
    icon: <ArchiveRestore className="h-10 w-10 text-primary" />,
    features: [
      "Lowest storage cost",
      "Long-term retention",
      "Retrieval options from minutes to hours",
      "Compliance features",
      "Secure encryption",
      "Audit logging"
    ]
  },
  {
    id: "multi-region",
    title: "Multi-Region Storage",
    description:
      "Data replicated across multiple geographic regions for highest availability",
    icon: <Globe className="h-10 w-10 text-primary" />,
    features: [
      "Cross-region replication",
      "Highest availability",
      "Disaster recovery protection",
      "Global data access",
      "Reduced latency for global users",
      "Regional failover"
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
              <Link href={`${hubUrl}/buckets`}>
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
            <p className="text-lg text-foreground/80 mb-6">
              {t("Storage tiers and configurations")}
            </p>

            <div className="flex flex-row flex-wrap gap-4 mb-8">
              {storageOptions.map((option) => (
                <Card
                  key={option.id}
                  className="glass-bg-alt-2 shadow-sm hover:shadow-md cursor-default transition-shadow duration-300 flex-1 min-w-[200px]">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <div className="mb-3">{option.icon}</div>
                      <h4 className="font-medium text-lg text-center mb-2">
                        {option.title}
                      </h4>
                      <p className="text-sm text-foreground/70 mb-3 text-center">
                        {option.description}
                      </p>
                      <div className="text-sm mb-3 w-full">
                        <h5 className="font-medium mb-2">{t("Key Features")}:</h5>
                        <ul className="space-y-1">
                          {option.features.slice(0, 3).map((feature, index) => (
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
