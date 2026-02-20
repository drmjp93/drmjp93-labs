document.addEventListener("DOMContentLoaded", () => {
  // --- DATA MAPPING ---
  const symptoms = [
    { id: "s1", gu: "છાતીમાં દુખાવો", en: "Chest Pain", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s14", gu: "બહુ વધારે તાવ", en: "High Fever", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s15", gu: "શ્વાસ લેવામાં તકલીફ", en: "Difficulty Breathing", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s16", gu: "અચાનક પગમાં સોજા", en: "Sudden Leg Swelling", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s17", gu: "ચાલવામાં છાતીમાં દુખે / શ્વાસ ચડે", en: "Chest Pain/Breathless on Walking", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s18", gu: "અંધારા આવે / ચક્કર", en: "Blackouts / Dizziness", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s19", gu: "લકવા જેવી અસર", en: "Paralysis Symptoms", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s20", gu: "બોલવામાં તકલીફ", en: "Difficulty Speaking", dept: "EMERGENCY ROOM", isEr: true },
    
    { id: "s21", gu: "< ૧૪ વર્ષથી નાના દર્દી", en: "Patient < 14 Years", dept: "Pediatrics", isEr: false },
    
    { id: "s2", gu: "શરદી", en: "Cold", dept: "General Medicine", isEr: false },
    { id: "s3", gu: "ખાંસી", en: "Cough", dept: "General Medicine", isEr: false },
    { id: "s4", gu: "તાવ", en: "Fever", dept: "General Medicine", isEr: false },
    { id: "s5", gu: "ડાયાબિટીસ", en: "Diabetes", dept: "General Medicine", isEr: false },
    { id: "s6", gu: "ઝાડા", en: "Diarrhea", dept: "General Medicine", isEr: false },
    { id: "s7", gu: "ઉલટી", en: "Vomiting", dept: "General Medicine", isEr: false },
    { id: "s8", gu: "બ્લડ પ્રેશર", en: "Blood Pressure", dept: "General Medicine", isEr: false },
    { id: "s9", gu: "થાઈરોઈડ", en: "Thyroid", dept: "General Medicine", isEr: false },
    
    { id: "s10", gu: "પેટમાં દુખાવો", en: "Stomach Ache", dept: "General Surgery", isEr: false },
    { id: "s11", gu: "વાગ્યું છે / લોહી / સોજો", en: "Injury / Bleeding / Swelling", dept: "General Surgery", isEr: false },
    { id: "s12", gu: "ઘા થયો છે", en: "Wound", dept: "General Surgery", isEr: false },
    { id: "s13", gu: "જીવજંતુ કરડ્યું / સોજો", en: "Insect Bite / Swelling", dept: "General Surgery", isEr: false },
    
    { id: "s22", gu: "સાંધામાં દુખાવો", en: "Joint Pain", dept: "Surgery / Orthopedics", isEr: false },
    { id: "s23", gu: "પડી ગયા", en: "Fall", dept: "Surgery / Orthopedics", isEr: false },
    { id: "s24", gu: "માથામાં વાગ્યું", en: "Head Injury", dept: "Surgery / Orthopedics", isEr: false },
    { id: "s25", gu: "ફ્રેક્ચર", en: "Fracture", dept: "Orthopedics", isEr: false },
    { id: "s26", gu: "હાથમાં એક જગ્યાએ સોજો", en: "Localized Hand Swelling", dept: "Surgery / Orthopedics", isEr: false },
    
    // Added for completeness based on your broad specialties request
    { id: "s27", gu: "ચામડીના રોગ / ખંજવાળ", en: "Skin Rash / Itching", dept: "Dermatology", isEr: false },
    { id: "s28", gu: "સ્ત્રી રોગ / સગર્ભા", en: "Women's Health / Pregnancy", dept: "OBGY", isEr: false }
  ];

  let currentLang = localStorage.getItem("triage-lang") || "en";
  let selectedIds = new Set();

  // --- UI ELEMENTS ---
  const langToggle = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");
  const pillsContainer = document.getElementById("pills-container");
  const resultCard = document.getElementById("result-card");
  const resultDept = document.getElementById("result-dept");
  const resultSymptoms = document.getElementById("result-symptoms");
  const copyBtn = document.getElementById("copy-btn");
  const clearBtn = document.getElementById("clear-btn");

  // --- LANGUAGE LOGIC ---
  function updateLanguage() {
    langLabel.classList.add("fade");
    
    setTimeout(() => {
      langLabel.textContent = currentLang === "en" ? "ENG" : "ગુજ";
      document.getElementById("page-title").textContent = currentLang === "en" ? "OPD Triage System" : "ઓપીડી વર્ગીકરણ";
      document.getElementById("page-subtitle").textContent = currentLang === "en" ? "Tap symptoms to assign department" : "વિભાગ નક્કી કરવા માટે લક્ષણો પસંદ કરો";
      copyBtn.textContent = currentLang === "en" ? "Copy Summary" : "કૉપિ કરો";
      clearBtn.textContent = currentLang === "en" ? "Clear All" : "બધું ભૂંસી નાખો";
      
      renderPills();
      updateResult();
      langLabel.classList.remove("fade");
    }, 150);
  }

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "gu" : "en";
    localStorage.setItem("triage-lang", currentLang);
    updateLanguage();
  });

  // --- RENDER PILLS ---
  function renderPills() {
    pillsContainer.innerHTML = "";
    symptoms.forEach(sym => {
      const pill = document.createElement("div");
      pill.className = `symptom-pill ${selectedIds.has(sym.id) ? "selected" : ""}`;
      pill.textContent = currentLang === "en" ? sym.en : sym.gu;
      
      pill.addEventListener("click", () => {
        if (selectedIds.has(sym.id)) {
          selectedIds.delete(sym.id);
          pill.classList.remove("selected");
        } else {
          selectedIds.add(sym.id);
          pill.classList.add("selected");
        }
        updateResult();
      });
      pillsContainer.appendChild(pill);
    });
  }

  // --- TRIAGE LOGIC ---
  function updateResult() {
    if (selectedIds.size === 0) {
      resultDept.textContent = currentLang === "en" ? "Select Symptoms" : "લક્ષણો પસંદ કરો";
      resultSymptoms.textContent = currentLang === "en" ? "No symptoms selected." : "કોઈ લક્ષણ પસંદ કરેલ નથી.";
      resultCard.classList.remove("emergency");
      return;
    }

    let isEmergency = false;
    let isPediatric = false;
    let departments = new Set();
    let selectedTexts = [];

    selectedIds.forEach(id => {
      const sym = symptoms.find(s => s.id === id);
      selectedTexts.push(currentLang === "en" ? sym.en : sym.gu);
      
      if (sym.isEr) isEmergency = true;
      if (sym.id === "s21") isPediatric = true;
      departments.add(sym.dept);
    });

    // Determine Final Department String
    let finalDept = "";
    if (isEmergency) {
      finalDept = isPediatric ? "PEDIATRIC EMERGENCY ROOM" : "EMERGENCY ROOM";
      resultCard.classList.add("emergency");
    } else {
      resultCard.classList.remove("emergency");
      // Remove generic departments if specific ones exist, or join them
      if (isPediatric && departments.size === 1) {
          finalDept = "Pediatrics";
      } else {
          // Filter out ER from the list if it's not an emergency (safety check)
          const deptArray = Array.from(departments).filter(d => d !== "EMERGENCY ROOM");
          finalDept = deptArray.join(" + ");
      }
    }

    resultDept.textContent = finalDept;
    resultSymptoms.textContent = selectedTexts.join(", ");
  }

  // --- ACTIONS ---
  clearBtn.addEventListener("click", () => {
    selectedIds.clear();
    renderPills();
    updateResult();
  });

  copyBtn.addEventListener("click", () => {
    if (selectedIds.size === 0) return;
    const textToCopy = `Triage Dept: ${resultDept.textContent}\nSymptoms: ${resultSymptoms.textContent}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = currentLang === "en" ? "Copied!" : "કૉપિ થઈ ગયું!";
      setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
    });
  });

  // Initialize
  updateLanguage();
});
