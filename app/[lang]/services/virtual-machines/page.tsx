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

const serviceId = "virtual-machines";
const service = services.find((service) => service.id === serviceId)!;

const features = [
  "Flexible VM configurations",
  "Pay-as-you-go pricing",
  "Dedicated or shared resources",
  "Automated scaling",
  "High availability options",
  "Integrated monitoring and management"
];
const useCases = [
  "Application hosting",
  "Development and testing",
  "Disaster recovery",
  "Legacy application migration"
];

const vmOptions = [
  {
    id: "general-purpose",
    title: "General Purpose",
    description: "Balanced CPU and memory for a wide range of workloads",
    specs: "4 vCPU, 16 GB RAM",
    icon: "/placeholder.svg?height=80&width=80"
  },
  {
    id: "compute-optimized",
    title: "Compute Optimized",
    description: "High CPU performance for compute-intensive workloads",
    specs: "8 vCPU, 16 GB RAM",
    icon: "/placeholder.svg?height=80&width=80"
  },
  {
    id: "memory-optimized",
    title: "Memory Optimized",
    description: "High memory capacity for memory-intensive workloads",
    specs: "4 vCPU, 32 GB RAM",
    icon: "/placeholder.svg?height=80&width=80"
  },
  {
    id: "storage-optimized",
    title: "Storage Optimized",
    description: "High storage capacity and I/O performance for data-intensive workloads",
    specs: "4 vCPU, 16 GB RAM, 2 TB NVMe SSD",
    icon: "/placeholder.svg?height=80&width=80"
  }
];

const operatingSystems = [
  { id: "rhel", name: "Red Hat Enterprise Linux", logo: "/os/redhat-logo.png" },
  { id: "windows", name: "Windows Server", logo: "/os/windows-logo.png" },
  { id: "ubuntu", name: "Ubuntu", logo: "/os/ubuntu-logo.png" },
  { id: "centos", name: "CentOS", logo: "/os/centos-logo.png" },
  { id: "debian", name: "Debian", logo: "/os/debian-logo.png" },
  { id: "suse", name: "SUSE Linux Enterprise", logo: "/os/suse-logo.png" },
  { id: "fedora", name: "Fedora", logo: "/os/fedora-logo.png" },
  { id: "oracle", name: "Oracle Linux", logo: "/os/oracle-logo.png" }
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
              <Link href={`${hubUrl}/boxes`}>
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

          {/* VM Configuration Section */}
          <div className="mt-12">
            {/* <h3 className="text-xl font-bold mb-4 text-foreground">Sizing Options</h3> */}
            <p className="text-lg text-foreground/80 mb-6">{t("Sizing Options")}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {vmOptions.map((option) => (
                <Card
                  key={option.id}
                  className="glass-bg-alt-2 shadow-sm hover:shadow-md cursor-default transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex flex-col">
                      <h4 className="font-medium text-foreground">{option.title}</h4>
                      <p className="text-sm text-foreground/60 mt-2 mb-3">
                        {option.description}
                      </p>
                      <p className="text-sm font-semibold text-primary">{option.specs}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* <h3 className="text-xl font-bold mb-4 text-foreground">Operating Systems</h3> */}
            <p className="text-lg text-foreground/80 mb-6">{t("Operating Systems")}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {operatingSystems.map((os) => (
                <Card
                  key={os.id}
                  className="glass-bg-alt-2 shadow-sm hover:shadow-md cursor-default transition-shadow duration-200">
                  <CardContent className="p-3">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 flex items-center justify-center mb-2">
                        <Image
                          src={os.logo || "/placeholder.svg"}
                          alt={os.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm">{os.name}</span>
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
