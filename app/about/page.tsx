import { Award, Users, Wrench, Heart } from "lucide-react";
export const metadata = {
  title: "About Us — OSTA Services",
  description:
    "Learn about OSTA Services — UAE's trusted HVAC partner delivering quality, reliability, and care since day one.",
  openGraph: {
    title: "About OSTA Services",
    description:
      "UAE's trusted HVAC partner delivering quality, reliability, and care.",
  },
};

const values = [
  {
    icon: Award,
    title: "Excellence",
    desc: "We deliver only the highest standard in every job.",
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "Your comfort and trust drive every decision we make.",
  },
  {
    icon: Wrench,
    title: "Expert Craft",
    desc: "Certified technicians with deep technical know-how.",
  },
  {
    icon: Heart,
    title: "Care",
    desc: "We treat your home like our own.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-6 pt-16 pb-12">
        <h1 className="font-display text-5xl md:text-6xl font-bold max-w-3xl">
          Delivering Quality,{" "}
          <span className="text-gradient">Building Trust</span>
        </h1>

        <p className="text-lg text-muted-foreground mt-6 max-w-2xl">
          OSTA Services is the UAE&apos;s premier HVAC and technical services
          company. For over a decade, we&apos;ve helped thousands of homes and
          businesses stay cool, comfortable, and worry-free.
        </p>
      </section>

      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-12">
        <div className="rounded-3xl bg-gradient-card border border-border/50 p-10">
          <h2 className="font-display text-3xl font-bold mb-4">
            Our Mission
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            To provide reliable, affordable, and professional HVAC services
            that exceed expectations — delivered by technicians who genuinely
            care.
          </p>
        </div>

        <div className="rounded-3xl bg-gradient-card border border-border/50 p-10">
          <h2 className="font-display text-3xl font-bold mb-4">
            Our Vision
          </h2>

          <p className="text-muted-foreground leading-relaxed">
            To be the most trusted name in HVAC and technical services across
            the Middle East — known for quality, transparency, and care.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-12">
          What We Stand For
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl p-7 bg-surface/60 border border-border/50"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center mb-5">
                <v.icon className="h-5 w-5 text-primary-foreground" />
              </div>

              <h3 className="font-semibold mb-1.5">{v.title}</h3>

              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}