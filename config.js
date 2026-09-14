/**
 * CONFIGURAÇÃO DO MODELO - JHADDY ARAÚJO STUDIO
 * 
 * 💡 DICA: Altere os dados deste arquivo para personalizar
 * o site com novos telefones, links ou informações adicionais.
 */

const SITE_CONFIG = {
  // Identidade do Estúdio
  clinicName: "Jhaddy Araújo | Studio de Beleza",
  shortName: "Jhaddy Araújo",
  tagline: "Epilação Terapêutica • Clareamento Íntimo • Limpeza de Pele • Dermaplaning • Salvador/BA",
  description: "Jhaddy Araújo Studio de Beleza no Condomínio Vila dos Sapotizeiros, Cabula em Salvador/BA. Especialista em Epilação Terapêutica, Clareamento Íntimo, Limpeza de Pele e Dermaplaning. Seu Momento, Seu Cuidado.",
  
  // Responsável Técnica / Especialista
  specialist: {
    name: "Jhaddy Araújo",
    title: "Esteticista e Especialista em Cuidados da Pele",

    bio: "À frente do estúdio no Cabula, Jhaddy Araújo é esteticista especializada em cuidados personalizados para a saúde e recuperação da pele. Seus atendimentos são realizados com hora marcada em ambiente privativo, unindo técnicas de biossegurança, materiais descartáveis e cosméticos desenvolvidos para peles sensíveis.",
    badge: "Esteticista & Especialista",
    photo: "assets/images/jhaddy-araujo.png"
  },

  // Contato e Atendimento
  contact: {
    whatsapp: "5571987870244",
    phoneDisplay: "",
    email: "",
    responsePromise: "Atendimento pelo WhatsApp em horário comercial",
    defaultWhatsappMessage: "Olá, Jhaddy! Gostaria de informações sobre agendamento de avaliação no estúdio.",
    instagram: "jhaddy_araujostudioo",
    instagramUrl: "https://www.instagram.com/jhaddy_araujostudioo/",
    social: {
      instagram: "https://www.instagram.com/jhaddy_araujostudioo/",
      facebook: "",
      youtube: "",
      tiktok: ""
    },
    address: {
      street: "R. Silveira Martins, 551",
      complement: "Condomínio Vila dos Sapotizeiros",
      neighborhood: "Cabula",
      city: "Salvador",
      state: "BA",
      cep: "41150-000"
    },
    hours: {
      weekdays: "Segunda a Sexta: 08h00 às 18h00",
      saturday: "Sábado: 08h00 às 13h00 (Com agendamento prévio)",
      sunday: "Domingo: Fechado"
    },
    // Google Maps CID e Embed
    mapsCid: "14108806332529309859",
    mapsDirectUrl: "https://maps.google.com/?cid=14108806332529309859",
    mapsEmbedUrl: "https://maps.google.com/maps?q=condom%C3%ADnio+vila+dos+sapotizeiros+-+R.+Silveira+Martins,+551+-+Cabula,+Salvador+-+BA,+41150-000&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },

  // Métricas e Rastreamento (Opcional)
  tracking: {
    googleTagManagerId: "", // Ex: "GTM-XXXXXXX"
    googleAnalyticsId: "",  // Ex: "G-XXXXXXXXXX"
    metaPixelId: ""         // Ex: "1234567890123456"
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
