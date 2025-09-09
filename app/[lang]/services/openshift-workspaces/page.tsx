import { ArrowLeft, Building2, CheckCircle2, Code, Settings, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import Navbar from "@/components/navbar";
import services from "@/utils/services";
import { getTranslations } from "next-intl/server";
import { getHubUrl } from "@/lib/config";

const serviceId = "openshift-workspaces";
const service = services.find((service) => service.id === serviceId)!;

const features = [
  "Fully managed OpenShift environment",
  "Integrated CI/CD pipelines",
  "Containerized development workspaces",
  "Team collaboration tools",
  "Automated scaling and resource management",
  "Enterprise-grade security"
];
const useCases = [
  "Enterprise application development",
  "Microservices architecture",
  "DevOps transformation",
  "Cloud-native development"
];

const workspaceOptions = [
  {
    id: "developer",
    title: "Developer Workspace",
    description: "Basic workspace for individual developers with 4 vCPU and 8GB RAM",
    icon: <Code className="h-10 w-10 text-primary" />,
    features: [
      "4 vCPU cores",
      "8GB RAM",
      "100GB storage",
      "Single developer access",
      "Basic CI/CD pipeline",
      "Standard support"
    ]
  },
  {
    id: "team",
    title: "Team Workspace",
    description: "Collaborative workspace for small teams with 8 vCPU and 16GB RAM",
    icon: <Users className="h-10 w-10 text-primary" />,
    features: [
      "8 vCPU cores",
      "16GB RAM",
      "250GB storage",
      "Up to 5 team members",
      "Advanced CI/CD pipeline",
      "Priority support"
    ]
  },
  {
    id: "enterprise",
    title: "Enterprise Workspace",
    description: "Advanced workspace for large teams with 16 vCPU and 32GB RAM",
    icon: <Building2 className="h-10 w-10 text-primary" />,
    features: [
      "16 vCPU cores",
      "32GB RAM",
      "500GB storage",
      "Unlimited team members",
      "Enterprise CI/CD pipeline",
      "24/7 premium support",
      "High availability configuration"
    ]
  },
  {
    id: "custom",
    title: "Custom Workspace",
    description: "Tailored workspace configuration based on your specific requirements",
    icon: <Settings className="h-10 w-10 text-primary" />,
    features: [
      "Custom CPU allocation",
      "Custom memory allocation",
      "Custom storage configuration",
      "Custom team size",
      "Custom CI/CD pipeline",
      "Dedicated support team"
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

              <Link href={`${hubUrl}/workspaces`}>
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
              {t("OpenShift Workspaces Options")}
            </p>

            <div className="flex flex-row flex-wrap gap-4 mb-8">
              {workspaceOptions.map((option) => (
                <Card
                  key={option.id}
                  className="glass-bg-alt-2 shadow-sm hover:shadow-md cursor-default transition-shadow duration-300 flex-1 min-w-[200px]">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <div className="mb-3">{option.icon}</div>
                      <h4 className="font-medium text-lg text-center mb-2">
                        {t(option.title)}
                      </h4>
                      <p className="text-sm text-foreground/70 mb-3 text-center">
                        {t(option.description)}
                      </p>
                      <div className="text-sm mb-3 w-full">
                        <h5 className="font-medium mb-2">{t("Key Features")}:</h5>
                        <ul className="space-y-1">
                          {option.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{t(feature)}</span>
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
