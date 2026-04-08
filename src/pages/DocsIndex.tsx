import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const docs = [
  {
    slug: "partner-api",
    title: "Partner API",
    description:
      "Integrate KES on-ramp and off-ramp. Load mobile money into any EVM wallet and cash out back to M-Pesa - without requiring end-users to have a Bpesa account.",
    badge: "v1",
    tag: "REST API",
  },
];

const DocsIndex = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="max-w-5xl mx-auto px-4 lg:px-8 py-20">
      <div className="mb-14">
        <p className="text-sm font-medium text-primary uppercase tracking-widest mb-3">
          Documentation
        </p>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Build on Bpesa
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          APIs and guides for integrating Bpesa's open money infrastructure
          into your product.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            to={`/docs/${doc.slug}`}
            className="group flex flex-col border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all bg-card"
          >
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {doc.tag}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 mb-2">
              <span className="font-semibold text-foreground">{doc.title}</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                {doc.badge}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {doc.description}
            </p>
            <div className="flex items-center gap-1 mt-5 text-primary text-sm font-medium group-hover:gap-2 transition-all">
              Read docs <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default DocsIndex;
