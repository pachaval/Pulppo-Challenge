import Image from "next/image";
import React from "react";

const Header = () => (
  <header className="bg-white shadow-md p-4">
    <div className="container mx-auto">
      <Image
        src={`/logo.png`}
        className="h-10 object-contain"
        alt="Pulppo"
        width={256}
        height={54}
      />
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-white shadow-md p-4 mt-8">
    <div className="container mx-auto text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Pulppo. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

const Objective = () => (
  <section className="my-8 p-4">
    <h2 className="text-2xl font-bold mb-4">Objetivo</h2>
    <p>
      Construir una aplicación web para visualizar y analizar datos de
      propiedades utilizando gráficos interactivos y estadísticas, en menos de
      72hs.
    </p>
  </section>
);

const Requirements = () => (
  <section className="my-8 p-4 rounded">
    <h3 className="text-xl font-bold mb-4">Requerimientos</h3>

    <div className="mb-4">
      <h4 className="text-lg font-semibold">Frontend</h4>
      <ol className="list-decimal list-inside">
        <li>
          <strong>Framework:</strong> Next.js
        </li>
        <li>
          <strong>Estilos:</strong> TailwindCSS (preferente) o cualquier
          librería
        </li>
        <li>
          <strong>Gráficos:</strong> Utilizar una librería de gráficos como
          Recharts (recomendado), Chart.js o D3.js
        </li>
      </ol>
    </div>

    <div className="mb-4">
      <h4 className="text-lg font-semibold">Backend</h4>
      <ol className="list-decimal list-inside">
        <li>
          <strong>Opción 1:</strong> Next.js APP Router o Page router
        </li>
        <li>
          <strong>Opción 2:</strong> Express.js API
        </li>
      </ol>
    </div>

    <div className="mb-4">
      <h4 className="text-lg font-semibold">Base de Datos</h4>
      <p>
        PULPPO proveerá una base de datos de prueba con datos históricos de
        propiedades del MLS de Pulppo (en MongoDB).
      </p>
    </div>
  </section>
);

const Functionalities = () => (
  <section className="my-8 p-4">
    <h3 className="text-xl font-bold mb-4">Funcionalidades</h3>
    <ol className="list-decimal list-inside">
      <li>
        <strong>Autenticación (opcional):</strong> Implementar registro e inicio
        de sesión de usuarios.
      </li>
      <li>
        <strong>Visualización de Datos:</strong> Mostrar diferentes gráficos y
        tablas para analizar los datos de propiedades (precio medio por
        ubicación, tendencias de mercado, etc.).
      </li>
      <li>
        <strong>Filtros:</strong> Implementar filtros para personalizar las
        visualizaciones de datos.
      </li>
      <li>
        <strong>Exportar Datos (opcional):</strong> Permitir la exportación de
        datos en formatos como CSV.
      </li>
    </ol>
  </section>
);

const AdditionalRequirements = () => (
  <section className="my-8 p-4 rounded">
    <h3 className="text-xl font-bold mb-4">Requisitos Adicionales</h3>
    <ol className="list-decimal list-inside">
      <li>
        <strong>Git:</strong> El candidato debe crear un repositorio en GitHub y
        hacer commits frecuentes y descriptivos.
      </li>
      <li>
        <strong>Docker (opcional):</strong> Proveer un <code>Dockerfile</code>{" "}
        para levantar el frontend y otro para el backend (en caso de utilizar
        express.js)
      </li>
    </ol>
  </section>
);

const Evaluation = () => (
  <section className="my-8 p-4">
    <h3 className="text-xl font-bold mb-4">Evaluación</h3>
    <ul className="list-disc list-inside">
      <li>
        <strong>Realización:</strong> Se valora, más que nada, la realización
        del proyecto, aunque no se termine con todas las funcionalidades. Es
        importante la priorización. (<em>Done is better than perfect</em>)
      </li>
      <li>
        <strong>Funcionalidad:</strong> Que todas las características entregas
        funcionen correctamente.
      </li>
      <li>
        <strong>Código:</strong> Calidad del código, estructura y organización.
      </li>
      <li>
        <strong>Visualizaciones:</strong> Calidad e interactividad de los
        gráficos y tablas.
      </li>
      <li>
        <strong>Git:</strong> Uso adecuado de git con commits descriptivos y
        estructurados.
      </li>
      <li>
        <strong>Docker:</strong> Correcta configuración de Docker y Docker
        Compose para levantar la aplicación completa.
      </li>
    </ul>
  </section>
);

const Delivery = () => (
  <section className="my-8 p-4 rounded">
    <h3 className="text-xl font-bold mb-4">Entrega</h3>
    <p>
      El candidato deberá compartir el enlace al repositorio GitHub y las
      instrucciones para levantar el proyecto.
    </p>
  </section>
);

const ProjectDescription = () => (
  <div>
    <Header />
    <main className="max-w-4xl mx-auto p-4">
      <Objective />
      <Requirements />
      <Functionalities />
      <AdditionalRequirements />
      <Evaluation />
      <Delivery />
    </main>
    <Footer />
  </div>
);

export default ProjectDescription;
