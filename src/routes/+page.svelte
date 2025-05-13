<script>
  import logo from "$lib/assets/logo.png";
  import hero from "$lib/assets/hero.jpg";
  import Navbar from "$lib/components/Navbar.svelte";

  const trailerUrl = "https://drive.google.com/file/d/1FxrKI87gDzcCPqaiPoFHASBk1nZhDX6r/preview"
</script>

<Navbar></Navbar>

<section class="bg-base-100">
  <div class="container mx-auto px-6 h-full flex items-center justify-center py-20">

  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Left -->
    <div class="md:pl-12 pt-10 pb-12 md:pb-0 md:pt-20">
      <h1 class="text-5xl font-bold">Diggy</h1>
      <h2 class="pt-4 pb-2 font-bold text-2xl text-secondary text">Next-generation pipes inspection</h2>
      <p class="pb-4">
        Un robot autonomo per l’ispezione intelligente degli impianti tubistici. Grazie a intelligenza artificiale e sensoristica avanzata, Diggy rileva problemi strutturali prima che diventino criticità, riduce l’impatto ambientale e abbatte i costi operativi. Sicuro, sostenibile, intelligente.
      </p>

      <a href="#features" class="btn btn-primary">Scopri di più</a>
      <a href="/dashboard" class="btn btn-outline">Prova la demo</a>
    </div>
    <!-- Right -->
    <div class="hidden md:flex relative justify-center">
      <img src={hero} alt="Diggy Hero" class="w-[70%] h-auto" />
    </div>
  </div>
</div>
</section>

<!-- Video Demo Section -->
<section id="demo" class="py-8 bg-gray-50">
  <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl text-center text-gray-900 mb-8">Vedi <b>diggy</b> in azione</h2>
      <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
          <iframe 
              class="w-full h-96" 
              src={trailerUrl}
              title="Diggy Demo Video" 
              frameborder="0" 
              allowfullscreen
          ></iframe>
      </div>
  </div>
</section>

<!-- Features Section -->
<section id="features" class="py-8 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 class="text-3xl text-center text-gray-900 mb-8">Key <b>Features</b></h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div class="text-emerald-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Visualizzazione 3D</h3>
              <p class="text-gray-600">Modelli 3D interattivi con sovrapposizione dei dati dei sensori in tempo reale per un'ispezione completa.</p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div class="text-emerald-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Monitoraggio in tempo reale</h3>
              <p class="text-gray-600">Tracciamento continuo dei parametri critici con soglie di allerta personalizzabili.</p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div class="text-emerald-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Diagnostica AI</h3>
              <p class="text-gray-600">Algoritmi di machine learning rilevano anomalie e prevedono guasti potenziali.</p>
          </div>
      </div>
  </div>
</section>

<footer class="footer p-10 bg-neutral text-neutral-content">
  <div>
      <span class="footer-title">Project Documents</span>
      <a class="link link-hover" href="/docs/specification.pdf">Technical Specification</a>
      <a class="link link-hover" href="/docs/user-manual.pdf">User Manual</a>
      <a class="link link-hover" href="/docs/api-docs.pdf">API Documentation</a>
  </div>
  <div>
      <span class="footer-title">Legal</span>
      <a class="link link-hover" href="/privacy">Privacy policy</a>
      <a class="link link-hover" href="/terms">Terms of use</a>
  </div>
  <div>
      <span class="footer-title">Contact</span>
      <a class="link link-hover" href="mailto:contact@diggy.example">Email Us</a>
      <a class="link link-hover" href="tel:+1234567890">Call Support</a>
  </div>
</footer>
