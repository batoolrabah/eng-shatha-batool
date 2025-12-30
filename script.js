// Helper to scroll smoothly
function smoothScrollToHash() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// Mobile navigation
function setupMobileNav() {
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
    });
  });
}

// Year in footer
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

// Assistant (Questionnaire)
function setupAssistant() {
  const form = document.getElementById("assistant-form");
  const resultBox = document.getElementById("assistant-result");
  if (!form || !resultBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const goal = data.get("goal");
    const duration = data.get("duration");
    const recent = data.get("recent");

    let recommendation = "";
    let note =
      "هذه توصية مبدئية، التشخيص النهائي يكون بعد الفحص السريري عند د. فؤاد.";

    if (goal === "ألم") {
      recommendation =
        "ننصحك بحجز موعد عاجل لـ <strong>فحص شامل وعلاج السبب</strong>، وقد تحتاج إلى حشوة، علاج عصب، أو علاج لثة حسب التشخيص.";
      if (duration === "أيام") {
        recommendation +=
          " بما أن الألم حديث، من الأفضل عدم تأجيل الموعد لتجنّب تفاقم الحالة.";
      } else if (duration === "أشهر+") {
        recommendation +=
          " بما أن الألم مستمر منذ فترة، قد تحتاج إلى فحص معمّق وربما صور أشعة إضافية.";
      }
    } else if (goal === "تجميل") {
      recommendation =
        "ننصحك بحجز موعد لـ <strong>جلسة تصميم ابتسامة</strong>، غالبًا سيقترح الطبيب تبييض احترافي، مع إمكانية عدسات تجميلية (فينير) إذا لزم.";
      if (recent === "نعم") {
        recommendation +=
          " بما أنك أجريت علاجًا مؤخرًا، سيكون التركيز الآن على الناحية الجمالية.";
      } else if (recent === "لا") {
        recommendation +=
          " قد يوصي الدكتور أولًا بفحص وتنظيف قبل البدء في التجميل.";
      }
    } else if (goal === "تقويم") {
      recommendation =
        "ننصحك بحجز موعد لـ <strong>استشارة تقويم الأسنان</strong> لتقييم وضع التزاحم أو الفراغات، ويمكن مناقشة خيار التقويم المعدني أو الشفاف.";
      if (duration === "أشهر+") {
        recommendation +=
          " كلما تم البدء بالتقويم مبكرًا، كانت النتائج أسهل وأسرع عادةً.";
      }
    } else {
      recommendation =
        "يرجى اختيار هدفك من النموذج أولًا لنتمكن من اقتراح الخدمة المناسبة.";
    }

    resultBox.innerHTML = `
      <h3>الاقتراح المبدئي</h3>
      <p>${recommendation}</p>
      <p><strong>${note}</strong></p>
      <button type="button" class="btn btn-outline" id="assistant-to-booking">
        إرسال هذه المعلومة إلى نموذج الحجز
      </button>
    `;

    const toBookingBtn = document.getElementById("assistant-to-booking");
    if (toBookingBtn) {
      toBookingBtn.addEventListener("click", () => {
        const serviceSelect = document.getElementById("service");
        if (serviceSelect && goal) {
          if (goal === "ألم") serviceSelect.value = "ألم طارئ";
          if (goal === "تجميل") serviceSelect.value = "تجميل الابتسامة";
          if (goal === "تقويم") serviceSelect.value = "تقويم الأسنان";
        }
        const bookingSection = document.getElementById("booking");
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
}

// Booking forms (simulate sending)
function setupBookingForms() {
  const mainForm = document.getElementById("booking-form");
  const quickForm = document.getElementById("quick-booking-form");

  function handleSubmit(form, type) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || data.get("quick-name")) || "";
      const phone = (data.get("phone") || data.get("quick-phone")) || "";
      const service =
        (data.get("service") || data.get("quick-service")) || "فحص عام";
      const date = data.get("date") || "";

      alert(
        "تم استلام طلبك بنجاح 👌\n" +
          "الاسم: " +
          name +
          "\n" +
          "الجوال: " +
          phone +
          "\n" +
          "الخدمة: " +
          service +
          (date ? "\nاليوم المفضّل: " + date : "") +
          "\n\nسيتواصل معك فريق العيادة لتأكيد الموعد في أقرب وقت."
      );

      form.reset();
    });
  }

  if (mainForm) handleSubmit(mainForm, "main");
  if (quickForm) handleSubmit(quickForm, "quick");
}

// WhatsApp link
function setupWhatsApp() {
  const link = document.getElementById("whatsapp-link");
  if (!link) return;

  const phone = "966500000000"; // يمكن تعديل الرقم لاحقًا
  const message = encodeURIComponent(
    "مرحبًا، أود حجز موعد في عيادة د. فؤاد البكري."
  );
  link.href = `https://wa.me/${phone}?text=${message}`;
}

// Chatbot logic (basic rule-based)
function setupChatbot() {
  const toggle = document.getElementById("chatbot-toggle");
  const chatbot = document.getElementById("chatbot");
  const closeBtn = document.getElementById("chatbot-close");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-text");
  const messages = document.getElementById("chatbot-messages");
  const quickButtons = document.querySelectorAll(".chatbot-quick button");

  if (!toggle || !chatbot || !closeBtn || !form || !input || !messages) return;

  function openChatbot() {
    chatbot.classList.add("open");
  }

  function closeChatbot() {
    chatbot.classList.remove("open");
  }

  toggle.addEventListener("click", () => {
    if (chatbot.classList.contains("open")) {
      closeChatbot();
    } else {
      openChatbot();
    }
  });

  closeBtn.addEventListener("click", () => {
    closeChatbot();
  });

  function addMessage(text, from = "bot") {
    const div = document.createElement("div");
    div.className = "message " + (from === "user" ? "user" : "bot");
    div.innerHTML = `<p>${text}</p>`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function getBotReply(userText) {
    const text = userText.trim();
    const lower = text.toLowerCase();

    // Very simple keyword-based logic (Arabic words)
    if (lower.includes("موعد") || lower.includes("حجز")) {
      return (
        "لحجز موعد يمكنك تعبئة نموذج الحجز في الموقع، أو مراسلتنا مباشرة عبر واتساب من قسم التواصل في الأسفل. " +
        "ما نوع الخدمة التي ترغب بها؟ (مثال: تبييض، تقويم، زراعة، فحص عام)"
      );
    }

    if (
      lower.includes("متى") &&
      (lower.includes("تفتح") || lower.includes("الدوام") || lower.includes("المواعيد"))
    ) {
      return (
        "مواعيد عمل العيادة:\n" +
        "- من السبت إلى الخميس: 10 صباحًا حتى 1 ظهرًا، و 4 مساءً حتى 10 مساءً.\n" +
        "- يوم الجمعة: إجازة.\n" +
        "يمكنك طلب حجز موعد في الأوقات المناسبة لك."
      );
    }

    if (lower.includes("موقع") || lower.includes("وين") || lower.includes("أين")) {
      return (
        "تقع العيادة في: (يمكن إضافة العنوان التفصيلي هنا لاحقًا).\n" +
        "كما يمكنك الضغط على خريطة جوجل في قسم (موقع العيادة) لمعرفة الاتجاهات بدقة."
      );
    }

    if (lower.includes("سعر") || lower.includes("الأسعار") || lower.includes("بكم")) {
      return (
        "الأسعار تختلف حسب الحالة ودرجة الصعوبة، لكن يمكن إعطاؤك نطاقات تقريبية بعد فحص أولي.\n" +
        "لمساعدتك أكثر، أخبرني بالخدمة التي تفكر بها (تبييض، تقويم، زراعة، حشوة...)."
      );
    }

    if (
      lower.includes("تبييض") ||
      lower.includes("تجميل") ||
      lower.includes("ابتسامة")
    ) {
      return (
        "لتجميل الابتسامة، غالبًا نبدأ بالتبييض الاحترافي مع معالجة أي تسوّس أو التهابات، " +
        "ثم يمكن مناقشة العدسات (فينير) أو خيارات أخرى حسب حالتك. يُفضّل حجز استشارة تصميم ابتسامة."
      );
    }

    if (lower.includes("ألم") || lower.includes("يوجع") || lower.includes("وجع")) {
      return (
        "آسف لسماع ذلك، ألم الأسنان يحتاج فحص في أسرع وقت لتحديد السبب (تسوّس، عصب، لثة...).\n" +
        "ننصحك بحجز موعد عاجل أو زيارة العيادة مباشرة في أقرب وقت ممكن، ويمكنك استخدام نموذج الحجز في الموقع."
      );
    }

    // Default reply
    return (
      "شكرًا لسؤالك. سأحاول مساعدتك قدر الإمكان بناءً على ما كتبت، " +
      "لكن للتشخيص الصحيح لا بد من فحص عند د. فؤاد داخل العيادة.\n" +
      "حاول أن توضّح ما تريد: هل سؤالك عن مواعيد العمل، الأسعار، نوع خدمة معينة، أو حجز موعد؟"
    );
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    setTimeout(() => {
      const reply = getBotReply(text);
      addMessage(reply, "bot");
    }, 400);
  });

  quickButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const question = btn.getAttribute("data-question") || "";
      if (!question) return;
      addMessage(question, "user");
      const reply = getBotReply(question);
      addMessage(reply, "bot");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  smoothScrollToHash();
  setupMobileNav();
  setYear();
  setupAssistant();
  setupBookingForms();
  setupWhatsApp();
  setupChatbot();
});


