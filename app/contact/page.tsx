export default function Contact() {
  const phoneNumber = "+22950712675" // Mets ton numéro ici
  const message = "Bonjour, je veux plus d'informations sur les pronostics VIP."

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-xl w-full text-center">

        <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
          Contact WhatsApp 📲
        </h1>

        <p className="text-gray-600 mb-8">
          Clique sur le bouton ci-dessous pour nous contacter directement sur WhatsApp.
        </p>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Ouvrir WhatsApp
        </a>

      </div>
    </main>
  )
}