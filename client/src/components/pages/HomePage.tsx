import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ArrowRight, Clock, Users2, MessageSquareMore } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Professional Follow-ups,
              <span className="text-blue-600 dark:text-blue-400">
                {" "}
                Simplified
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              A centralized platform to track and manage professional
              communication with companies. Our tool ensures timely follow-ups,
              maintains detailed interaction logs, and supports seamless
              collaboration.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <SignedOut>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SignedOut>
              <SignedIn>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </SignedIn>
              <Button variant="ghost">Learn more</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
            Better Communication
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to manage professional relationships
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600 dark:text-blue-400" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Trusted by professionals worldwide
            </h2>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col bg-gray-100/80 dark:bg-gray-800/80 p-8"
              >
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: "Track Communications",
    description:
      "Keep detailed logs of all interactions with companies, ensuring no communication falls through the cracks.",
    icon: MessageSquareMore,
  },
  {
    name: "Smart Reminders",
    description:
      "Get intelligent reminders for follow-ups based on interaction history and company preferences.",
    icon: Clock,
  },
  {
    name: "Team Collaboration",
    description:
      "Work seamlessly with your team members, sharing insights and coordinating follow-ups effectively.",
    icon: Users2,
  },
];

const stats = [
  { id: 1, name: "Active Users", value: "10,000+" },
  { id: 2, name: "Companies Tracked", value: "50,000+" },
  { id: 3, name: "Follow-ups Managed", value: "1M+" },
  { id: 4, name: "Time Saved", value: "1000s of hours" },
];
