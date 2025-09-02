'use client'

import { Header } from "@/components/Header/header";
import { SiteDescription } from "@/components/SiteDescription/siteDescription";
import { MainFeatures } from "@/components/MainFeatures/mainFeatures"
import { Footer } from "@/components/Footer/footer"
import Loading from "@/components/Loading/loading"

import { useSession } from "next-auth/react";

import Link from "next/link";


export default function Home() {

  const { data, status } = useSession();

  if(status === 'loading') {
    return <Loading />  
  }

  return (
    <>
      <Header />
      <main className="bg-[var(--background)] flex flex-col justify-center items-center">
        <SiteDescription />
        <MainFeatures />
        <section className="container mx-auto px-4 py-16">
          <article className="bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg">
            <div className="p-8 text-center">
              <h3 className="text-3xl font-bold text-[#0F172A] mb-4">Pronto para organizar seus estudos?</h3>
              <p className="text-lg text-[#382F23] mb-6 opacity-90">Comece a usar o CodeNotes agora mesmo</p>
              <Link
                className="bg-[var(--secondary)] text-[#0F172A] rounded-md px-4 py-1 hover:brightness-90 "
                href={data ? "/editor" : "/login"}>
                Começar a usar
              </Link>
          </div>
        </article>
      </section>
      </main>
      <Footer />
    </>
  );
}
