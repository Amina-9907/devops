"use client";

import { Button } from "@/components/button";
import Navbar from "@/components/navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import services from "@/utils/services";
import { cl } from "@/utils/misc";
import { FormEvent, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircleIcon } from "lucide-react";
import { Spinner } from "@/components/spinner";

const industries = [
  "Agriculture",
  "Banking & Finance",
  "Education",
  "Energy & Utilities",
  "Government",
  "Healthcare",
  "Insurance",
  "Manufacturing",
  "Media & Entertainment",
  "Retail",
  "Technology",
  "Telecommunications",
  "Transportation & Logistics",
  "Other"
];

const jobRoles = [
  "C-Level Executive",
  "Director",
  "IT Manager",
  "System Administrator",
  "Developer",
  "Business Analyst",
  "Project Manager",
  "Consultant",
  "Other"
];

const countries = [
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo",
  "Côte d'Ivoire",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe"
];

const purposes = [
  "Business Operations",
  "Development & Testing",
  "Digital Transformation",
  "Disaster Recovery",
  "Infrastructure Modernization",
  "Research & Education",
  "Other"
];

const blank_fields = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "",
  phoneNumber: "",
  companyName: "",
  country: "",
  industry: "",
  jobRole: "",
  servicesOfInterest: [""],
  purpose: "",
  comment: ""
};

export default function Register() {
  const t = useTranslations();
  const language = useLocale();
  const [fields, setFields] = useState(blank_fields);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isDevelopment, setIsDevelopment] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;
    setLoading(true);
    setError(null);

    const result = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...fields, language })
    });
    setLoading(false);

    if (result.status !== 201) {
      setError("Failed to complete registration");
      return;
    }

    setSuccess(true);
  }

  function autoFillForm() {
    setFields({
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@gmail.com",
      countryCode: "+221",
      phoneNumber: "771882121",
      companyName: "accel tech",
      country: "Senegal",
      industry: industries[0],
      jobRole: jobRoles[0],
      servicesOfInterest: services.map((svc) => svc.id),
      purpose: purposes[0],
      comment: "a comment"
    });
  }

  useEffect(() => {
    if (
      window.location.host.includes("localhost") ||
      window.location.host.includes("staging")
    ) {
      setIsDevelopment(true);
    }
  }, []);
  return (
    <div className="flex min-h-screen flex-col abstract-bg-alt">
      <Navbar />
      <main className="flex-1 flex items-center">
        {/*  */}
        <div className="container m-auto py-8 px-4">
          <div className="max-w-4xl mx-auto  border rounded-xl overflow-hidden relative shadow-md glass-bg-alt-2">
            {isLoading && (
              <div className="bg-white/90 absolute -inset-0 z-10 flex items-center justify-center">
                <Spinner />
              </div>
            )}
            {isSuccess && (
              <div className="px-8 p-12 flex flex-col items-center justify-center gap-y-[10px]">
                <CheckCircleIcon className="text-green-500 w-[100px] h-[100px]" />
                <p className="text-xl font-medium">
                  {t("register.Registration Successful")}
                </p>
                <p className="text-gray-500">{t("register.Thank you for signing up")}</p>
              </div>
            )}

            <div className={cl("p-8", { hidden: isSuccess })}>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-2 text-foreground">
                  {t("register.Create your account")}
                </h2>
                <p className="text-foreground/60">
                  {t(
                    "register.Please fill out this form to request access to Heritage Cloud services"
                  )}
                </p>
              </div>

              {error && (
                <div className="bg-red-500 h-[40px] w-full  shadow-md text-white flex items-center justify-center mb-[20px] text-sm">
                  {error}
                </div>
              )}

              <form className="space-y-8" onSubmit={handleSubmit}>
                {isDevelopment && (
                  <div>
                    <button
                      type="button"
                      className="underline text-blue-600 hover:text-blue-800"
                      onClick={autoFillForm}>
                      Autofill form
                    </button>{" "}
                    (only available in development)
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="col-span-1 space-y-4">
                    {/* Personal Information */}
                    <h3 className="text-xl font-medium border-b border-b-black/10 pb-2 text-foreground">
                      {t("register.Personal Information")}
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium">
                          {t("register.First Name")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="first-name"
                          placeholder="Abdoulaye"
                          required
                          className="border-gray-300"
                          value={fields.firstName}
                          onChange={(e) =>
                            setFields({ ...fields, firstName: e.target.value })
                          }
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium">
                          {t("register.Last Name")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="last-name"
                          placeholder="Gueye"
                          required
                          className="border-gray-300"
                          value={fields.lastName}
                          onChange={(e) =>
                            setFields({ ...fields, lastName: e.target.value })
                          }
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {t("register.Business Email")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@company.com"
                        required
                        className="border-gray-300"
                        value={fields.email}
                        onChange={(e) => setFields({ ...fields, email: e.target.value })}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="phone-code" className="text-sm font-medium">
                          {t("register.Country Code")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="phone-code"
                          placeholder="+221"
                          required
                          className="border-gray-300"
                          value={fields.countryCode}
                          onChange={(e) =>
                            setFields({ ...fields, countryCode: e.target.value })
                          }
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          {t("register.Phone Number")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="77 123 45 67"
                          required
                          className="border-gray-300"
                          value={fields.phoneNumber}
                          onChange={(e) =>
                            setFields({ ...fields, phoneNumber: e.target.value })
                          }
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="col-span-1 space-y-4">
                    <h3 className="text-xl font-medium border-b border-b-black/10 pb-2 text-foreground">
                      {t("register.Company Information")}
                    </h3>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        {t("register.Company Name")}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="company"
                        placeholder="Company Name"
                        required
                        className="border-gray-300"
                        value={fields.companyName}
                        onChange={(e) =>
                          setFields({ ...fields, companyName: e.target.value })
                        }
                        disabled={isLoading}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="country" className="text-sm font-medium">
                          {t("register.Country")} <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="country"
                          className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          required
                          value={fields.country}
                          onChange={(e) =>
                            setFields({ ...fields, country: e.target.value })
                          }
                          disabled={isLoading}>
                          <option value="" disabled>
                            {t("register.Select a country")}
                          </option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="industry" className="text-sm font-medium">
                          {t("register.Industry")} <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="industry"
                          className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          required
                          value={fields.industry}
                          onChange={(e) =>
                            setFields({ ...fields, industry: e.target.value })
                          }
                          disabled={isLoading}>
                          <option value="" disabled>
                            {t("register.Select your industry")}
                          </option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry}>
                              {industry}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="job-role" className="text-sm font-medium">
                          {t("register.Job Role")} <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="job-role"
                          className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          required
                          value={fields.jobRole}
                          onChange={(e) =>
                            setFields({ ...fields, jobRole: e.target.value })
                          }
                          disabled={isLoading}>
                          <option value="" disabled>
                            {t("register.Select your role")}
                          </option>
                          {jobRoles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <h3 className="text-xl font-medium border-b border-b-black/10 pb-2 mt-6 text-foreground">
                      {t("register.Cloud Services")}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-4">
                      {t("register.Please select the services you are interested in")}
                    </p>

                    <div className="grid grid-cols-3 gap-2 border rounded-md p-3 bg-white/40">
                      {[
                        ...services
                        // { id: "not sure", Icon: MessageCircleQuestionIcon }
                      ].map((service) => (
                        <div
                          key={service.id}
                          className={cl(
                            "flex items-center space-x-2 h-[50px] border-2 p-1 pl-3 rounded-md cursor-pointer transition-colors duration-200",
                            {
                              "border-dashed border-gray-300 hover:bg-gray-200":
                                !fields.servicesOfInterest.includes(service.id)
                            },
                            {
                              " border-black bg-gray-100":
                                fields.servicesOfInterest.includes(service.id)
                            },
                            { "pointer-events-none": isLoading }
                          )}
                          onClick={() =>
                            setFields({
                              ...fields,
                              servicesOfInterest: fields.servicesOfInterest.includes(
                                service.id
                              )
                                ? fields.servicesOfInterest.filter(
                                    (svc) => svc !== service.id
                                  )
                                : [...fields.servicesOfInterest, service.id]
                            })
                          }>
                          <input
                            type="checkbox"
                            id={service.id}
                            checked={fields.servicesOfInterest.includes(service.id)}
                            className="pointer-events-none"
                            onChange={(e) =>
                              setFields({
                                ...fields,
                                servicesOfInterest: e.target.checked
                                  ? [...fields.servicesOfInterest, service.id]
                                  : fields.servicesOfInterest.filter(
                                      (svc) => svc !== service.id
                                    )
                              })
                            }
                            disabled={isLoading}
                          />
                          <service.Icon className="text-primary pointer-events-none" />
                          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pointer-events-none select-none  ">
                            {t(
                              service.id === "not sure"
                                ? "register.not sure"
                                : `${service.id}.title`
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    <h3 className="text-xl font-medium border-b border-b-black/10 pb-2 mt-6 text-foreground">
                      {t("register.Additional Information")}
                    </h3>

                    <div className="space-y-2">
                      <label htmlFor="purpose" className="text-sm font-medium">
                        {t("register.Purpose")} <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="purpose"
                        className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                        value={fields.purpose}
                        onChange={(e) =>
                          setFields({ ...fields, purpose: e.target.value })
                        }
                        disabled={isLoading}>
                        <option value="" disabled>
                          {t("register.Select your purpose")}
                        </option>
                        {purposes.map((purpose) => (
                          <option key={purpose} value={purpose}>
                            {purpose}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="comments" className="text-sm font-medium">
                        {t("register.Additional Comments")}
                      </label>
                      <textarea
                        id="comments"
                        rows={3}
                        className="w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Tell us more about your specific needs..."
                        value={fields.comment}
                        onChange={(e) =>
                          setFields({ ...fields, comment: e.target.value })
                        }
                        disabled={isLoading}></textarea>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2 mt-4">
                  <Checkbox id="terms" required={!isDevelopment} />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {t("register.I agree to the terms and conditions")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <p className="text-sm text-foreground/60">
                      {t("register.By submitting this form, you agree to our")}{" "}
                      <Link href="#" className="text-primary hover:underline">
                        {t("register.Terms of Service")}
                      </Link>{" "}
                      {t("register.and")}{" "}
                      <Link href="#" className="text-primary hover:underline">
                        {t("register.Privacy Policy")}
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-y-[10px]">
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary text-white text-lg"
                    disabled={isLoading}>
                    {t("register.Create Account")}
                  </Button>

                  <p className="text-center text-sm text-foreground/60">
                    {t("register.Already have an account")}?{" "}
                    <a
                      href="https://origins.heritage.africa"
                      className="text-primary hover:underline">
                      {t("register.Sign in")}
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/*  */}
      </main>
    </div>
  );
}
