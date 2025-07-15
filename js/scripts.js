document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer pentru animații
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    });

    // Animate elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        animateOnScroll.observe(el);
    });

    // Efect navbar la scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }
    });

    // Contor animat - MODIFICAT pentru a funcționa corect
    function animateCounter(element, finalValue, duration) {
        let start = null;
        const initial = 0; // Forțăm pornirea de la 0
        element.textContent = initial; // Resetăm valoarea inițială
        
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            element.textContent = Math.floor(initial + (finalValue - initial) * percentage);
            if (percentage < 1) window.requestAnimationFrame(step);
        };
        
        window.requestAnimationFrame(step);
    }

    // Inițializare grafice - ADAUGAT Grafic Cerere/Ofertă
    function initCharts() {
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryBlue = rootStyles.getPropertyValue('--primary-blue').trim();
        const accentTeal = rootStyles.getPropertyValue('--accent-teal').trim();
        const secondaryBlue = rootStyles.getPropertyValue('--secondary-blue').trim();

        // Grafic Cerere și Ofertă
        const supplyDemandCtx = document.getElementById('supplyDemandChart')?.getContext('2d');
        if (supplyDemandCtx) {
            new Chart(supplyDemandCtx, {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [
                        {
                            label: 'Cerere',
                            data: [65, 59, 80, 81],
                            borderColor: primaryBlue,
                            tension: 0.4
                        },
                        {
                            label: 'Ofertă',
                            data: [80, 55, 60, 70],
                            borderColor: '#e74c3c',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    }
                }
            });
        }

        // Grafic PIB
        const gdpCtx = document.getElementById('gdpChart')?.getContext('2d');
        if (gdpCtx) {
            new Chart(gdpCtx, {
                type: 'line',
                data: {
                    labels: ['2018', '2019', '2020', '2021', '2022'],
                    datasets: [{
                        label: 'PIB România (miliarde EUR)',
                        data: [202, 218, 200, 230, 250],
                        borderColor: primaryBlue,
                        tension: 0.4
                    }]
                }
            });
        }

        // Grafic inflație
        const inflationCtx = document.getElementById('inflationChart')?.getContext('2d');
        if (inflationCtx) {
            new Chart(inflationCtx, {
                type: 'bar',
                data: {
                    labels: ['2019', '2020', '2021', '2022', '2023'],
                    datasets: [{
                        label: 'Inflație (%)',
                        data: [3.8, 2.6, 5.1, 13.8, 9.4],
                        backgroundColor: accentTeal
                    }]
                }
            });
        }
    }

    // Inițializare componente
    const counterElement = document.querySelector('.counter');
    if (counterElement) {
        animateCounter(counterElement, 100, 2000);
    }

    // Inițializează toate graficele
    initCharts();

    // Mobile dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('show');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.parentElement;
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });

    // Toggle sisteme economice - VERSIUNE CORECTATĂ
    const systemToggle = document.getElementById('systemToggle');
    const marketExample = document.getElementById('marketExample');
    const plannedExample = document.getElementById('plannedExample');

    if (systemToggle && marketExample && plannedExample) {
        // Inițializare stare
        let isMarketActive = true;
        
        // Ascunde initiál economia planificată
        plannedExample.classList.remove('active');
        
        systemToggle.addEventListener('click', () => {
            isMarketActive = !isMarketActive;
            
            // Actualizează vizibilitatea
            marketExample.classList.toggle('active', isMarketActive);
            plannedExample.classList.toggle('active', !isMarketActive);
            
            // Actualizează textul butonului
            systemToggle.textContent = isMarketActive 
                ? 'Arată Economie Planificată' 
                : 'Arată Economie de Piață';
        });
    }

    // ADAUGAT: Hover efect pentru timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.timeline-content').style.transform = 'scale(1.05)';
        });
        item.addEventListener('mouseleave', () => {
            item.querySelector('.timeline-content').style.transform = 'scale(1)';
        });
    });

    // ADAUGAT: Interacțiune cu diagrama de resurse
    const pieSlices = document.querySelectorAll('.pie-chart .slice');
    pieSlices.forEach(slice => {
        slice.addEventListener('mouseenter', () => {
            slice.style.filter = 'brightness(1.1)';
            slice.style.transform = 'scale(1.05)';
        });
        slice.addEventListener('mouseleave', () => {
            slice.style.filter = 'brightness(1)';
            slice.style.transform = 'scale(1)';
        });
    });
    const resourcesCtx = document.getElementById('resourcesChart')?.getContext('2d');
    if (resourcesCtx) {
        new Chart(resourcesCtx, {
            type: 'pie',
            data: {
                labels: ['Naturale', 'Umane', 'Capital'],
                datasets: [{
                    label: 'Tipuri de Resurse',
                    data: [60, 30, 10],
                    backgroundColor: [
                        '#2B50EC', // naturale
                        '#1A936F', // umane
                        '#6B8EFF'  // capital
                    ],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#2D3748',
                            font: {
                                size: 14
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Distribuția resurselor în economie',
                        color: '#2B50EC',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }
    // Toggle pentru sisteme economice + tabel și descriere
    const buttons = document.querySelectorAll('.system-btn');
    const tabs = document.querySelectorAll('.system-tab'); // dacă ai taburi
    const tables = document.querySelectorAll('.system-table'); // fiecare tabel are data-type
    const systemDesc = document.getElementById('system-description');

    // Definim descrierile pentru fiecare sistem
    const descriptions = {
    free: '<strong>📈 Piață Liberă:</strong> Prețurile se formează liber prin cerere și ofertă. Statul intervine minim. Exemple: SUA, Germania.',
    planned: '<strong>🏛️ Planificată:</strong> Statul controlează întreaga economie – de la producție la prețuri. Exemple: Coreea de Nord.',
    mixed: '<strong>⚖️ Mixtă:</strong> Combinație între libertate de piață și intervenție guvernamentală. Exemple: România, Franța.'
    };

    console.log('Sistem de toggle inițializat.');

    // Ascultăm click pe fiecare buton
    buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const system = btn.dataset.system;
        console.log('Apăsat pe sistem:', system);

        // 1. Active state pentru butoane
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 2. Taburi (dacă ai în cod)
        tabs.forEach(tab => {
        tab.classList.remove('active');
        console.log('Dezactivez tab:', tab.id);
        });

        const activeTab = document.getElementById(system);
        if (activeTab) {
        activeTab.classList.add('active');
        console.log('Activez tab:', system);
        }

        // 3. Tabele: afișează doar tabelul potrivit
        tables.forEach(table => {
        const shouldShow = table.dataset.type === system;
        table.classList.toggle('hidden', !shouldShow);
        console.log(`Tabel ${table.dataset.type} → ${shouldShow ? 'AFIȘAT' : 'ASCUNS'}`);
        });

        // 4. Descrierea
        if (systemDesc) {
        systemDesc.innerHTML = descriptions[system] || '';
        console.log('Descriere setată pentru:', system);
        } else {
        console.warn('⚠️ Elementul #system-description nu există!');
        }
    });
    });

    // Setare inițială automată la încărcare
    const defaultSystem = document.querySelector('.system-btn.active')?.dataset.system || 'free';
    if (systemDesc) {
    systemDesc.innerHTML = descriptions[defaultSystem];
    console.log('Descriere implicită setată:', defaultSystem);
    } else {
    console.warn('⚠️ Elementul #system-description lipsește la inițializare!');
    }




    // Chart: distribuție sisteme pe continente
    const ctx = document.getElementById('economicSystemsChart')?.getContext('2d');
    if (ctx) {
    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['Europa', 'America de Nord', 'Asia', 'Africa'],
        datasets: [
            {
            label: 'Piață Liberă',
            data: [15, 20, 5, 2],
            backgroundColor: '#2B50EC'
            },
            {
            label: 'Planificată',
            data: [1, 0, 3, 1],
            backgroundColor: '#e74c3c'
            },
            {
            label: 'Mixtă',
            data: [25, 10, 20, 15],
            backgroundColor: '#1A936F'
            }
        ]
        },
        options: {
        responsive: true,
        plugins: {
            legend: {
            position: 'top'
            },
            title: {
            display: true,
            text: 'Distribuția globală a sistemelor economice'
            }
        }
        }
    });
    }
    // === Buget Personal ===
    let budgetChartInstance = null;

    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
        const income = parseFloat(document.getElementById('income').value);
        const food = parseFloat(document.getElementById('food').value);
        const transport = parseFloat(document.getElementById('transport').value);
        const education = parseFloat(document.getElementById('education').value);
        const fun = parseFloat(document.getElementById('fun').value);
        const feedback = document.getElementById('feedbackMsg');
        const chartCanvas = document.getElementById('budgetChart');

        if (isNaN(income) || isNaN(food) || isNaN(transport) || isNaN(education) || isNaN(fun)) {
        alert('Completează toate câmpurile!');
        return;
        }

        const total = food + transport + education + fun;
        const rest = income - total;

        // Feedback text
        if (rest < 0) {
        feedback.textContent = "⚠️ Cheltuiești mai mult decât câștigi!";
        feedback.style.color = "#e74c3c";
        } else if (rest < income * 0.1) {
        feedback.textContent = "⚠️ Ai foarte puține economii. Încearcă să reduci cheltuielile.";
        feedback.style.color = "#f39c12";
        } else {
        feedback.textContent = "✅ Bugetul tău este echilibrat!";
        feedback.style.color = "#1A936F";
        }

        if (budgetChartInstance) {
        budgetChartInstance.destroy();
        }

        budgetChartInstance = new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: ['Alimente', 'Transport', 'Educație', 'Divertisment', 'Economii'],
            datasets: [{
            label: 'Distribuția Bugetului (€)',
            data: [food, transport, education, fun, rest],
            backgroundColor: ['#2B50EC', '#6B8EFF', '#1A936F', '#f39c12', '#2ecc71']
            }]
        },
        options: {
            responsive: true,
            plugins: {
            legend: { display: false },
            title: {
                display: true,
                text: 'Structura bugetului personal'
            }
            }
        }
        });
    });
    }
    const toggleBtn = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    toggleBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('show');
  });
  const cards = document.querySelectorAll(".quiz-card");
  cards.forEach(card => {
    card.classList.add("fade-in");
  });
});
function showQuiz(id) {
    document.querySelectorAll(".quiz-section").forEach(q => q.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    window.scrollTo({ top: 300, behavior: 'smooth' });
  }
  
  function checkQuiz(id, answers) {
    let score = 0;
    for (let q in answers) {
      const selected = document.querySelector(`#${id}Form input[name="${q}"]:checked`);
      if (selected && selected.value === answers[q]) score++;
    }
  
    const result = document.getElementById(`${id}Result`);
    let badge = "", message = "";
  
    if (score === 6) {
        badge = "gold";
        message = "Excelent! Ai răspuns corect la toate întrebările!";
    } else if (score >= 4) {
        badge = "silver";
        message = "Foarte bine! Cunoștințe solide – mai ai puțin până la perfecțiune.";
    } else if (score >= 2) {
        badge = "bronze";
        message = "E un început bun! Continuă să înveți.";
    } else {
        badge = "try";
        message = "Nicio problemă – încearcă din nou și vei progresa!";
    }
      
  
    result.innerHTML = `Ai obținut <strong>${score}/6</strong>. <span class="badge ${badge}">${message}</span>`;
  }
  
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  
  function openModal(person) {
    const data = {
        smith: `
        <h3>Adam Smith</h3>
        <p><strong>Perioadă:</strong> Secolul XVIII | <strong>Lucrare fundamentală:</strong> „Avuția Națiunilor” (1776)</p>
        <p>Considerat părintele economiei moderne, Smith a introdus ideea că indivizii, urmărindu-și propriul interes, contribuie involuntar la binele comun – concept cunoscut sub numele de <em>„mâna invizibilă”</em>.</p>
        <p>Promova libertatea economică, proprietatea privată, concurența și non-intervenția statului în piețe (laissez-faire). A fost primul care a sistematizat concepte precum specializarea muncii, diviziunea muncii și rolul acumulării de capital în dezvoltarea economică.</p>
        <p><strong>Influență:</strong> A influențat major gândirea liberală și pe economiști precum Friedman și Hayek. A fost contestat de Marx pentru că ignora inegalitățile sociale rezultate din piața liberă.</p>
        <p><strong>Impact actual:</strong> Fundamentele economiilor capitaliste moderne se bazează încă pe conceptele sale despre piață și eficiență economică.</p>
      `,
      marx: `
        <h3>Karl Marx</h3>
        <p><strong>Perioadă:</strong> Secolul XIX | <strong>Lucrare principală:</strong> „Capitalul” (1867)</p>
        <p>Marx a fost filosof, economist și sociolog. A criticat profund capitalismul, considerându-l o sursă de exploatare a clasei muncitoare. A introdus concepte precum <em>lupta de clasă</em>, <em>alienarea muncitorului</em> și <em>dictatura proletariatului</em>.</p>
        <p>A susținut că mijloacele de producție ar trebui deținute colectiv, iar distribuția bunurilor să fie echitabilă. În opoziție directă cu Smith, Marx considera că piața liberă produce inegalitate și crize ciclice inevitabile.</p>
        <p><strong>Influență:</strong> A stat la baza ideologiei socialiste și comuniste, influențând politicile URSS, Chinei maoiste și altor regimuri din secolul XX.</p>
        <p><strong>Impact actual:</strong> Criticile sale sunt încă folosite în analiza inegalității economice și a capitalismului globalizat. A influențat teoriile post-marxiste, economia critică și curentele antiglobalizare.</p>
        <p><strong>Relația cu Smith:</strong> Marx l-a studiat și l-a criticat pe Smith, considerând că acesta idealiza piața liberă fără a analiza efectele sociale ale acumulării de capital.</p>
        `,
    keynes: `
        <h3>John Maynard Keynes</h3>
        <p><strong>Perioadă:</strong> Secolul XX | <strong>Lucrare-cheie:</strong> „Teoria Generală a Ocupării Forței de Muncă, a Dobânzii și a Banilor” (1936)</p>
        <p>A revoluționat economia modernă în urma Marii Crize din 1929. A observat că piețele nu se autoreglează eficient în perioade de criză și a propus intervenția statului prin politici fiscale (cheltuieli guvernamentale, reduceri de taxe) pentru a stimula cererea și a reduce șomajul.</p>
        <p><strong>Politica fiscală contra-ciclică</strong> – un concept central keynesian – presupune ca statul să cheltuie mai mult în criză și să economisească în perioade de creștere economică.</p>
        <p><strong>Influență:</strong> A stat la baza economiilor occidentale în perioada postbelică, în special în Europa și SUA. Modelele FMI și Băncii Mondiale au fost influențate de Keynes.</p>
        <p><strong>Impact actual:</strong> Gândirea sa a revenit în prim-plan în timpul crizelor financiare recente (2008, COVID-19), când guvernele au intervenit masiv în economie.</p>
        <p><strong>Poziționare:</strong> Între Smith și Marx. Nu respinge capitalismul, dar subliniază limitele pieței libere și necesitatea intervenției statului pentru stabilitate.</p>
      `,
      friedman: `
        <h3>Milton Friedman</h3>
        <p><strong>Perioadă:</strong> Secolul XX | <strong>Ideologie:</strong> Monetarism, Neoliberalism</p>
        <p>Friedman a fost cel mai influent economist liberal al secolului XX. A fost un critic dur al intervenției statului, susținând că piețele libere oferă cea mai bună alocare a resurselor. A fost promotor al <em>monetarismului</em> – ideea că inflația este un fenomen monetar, controlabil prin cantitatea de bani în economie.</p>
        <p>A pledat pentru dereglementare, privatizare, reducerea taxelor și limitarea cheltuielilor guvernamentale.</p>
        <p><strong>Influență:</strong> A influențat politicile economice din SUA sub Ronald Reagan și în Marea Britanie sub Margaret Thatcher. Modelele FMI în anii ’80-’90 reflectă filosofia sa economică.</p>
        <p><strong>Critici:</strong> A fost acuzat că a generat creșteri ale inegalității sociale și că a susținut regimuri autoritare care aplicau politici de piață (ex: Chile în timpul lui Pinochet).</p>
        <p><strong>Impact actual:</strong> Multe reforme de tip „austeritate” și politici de „piață liberă” din țările în dezvoltare au avut la bază gândirea sa.</p>
        <p><strong>Relație cu Keynes:</strong> Opoziție directă. A considerat intervențiile keynesiene ca fiind periculoase pentru echilibrul pe termen lung.</p>
        `,

    };
    modalText.innerHTML = data[person];
    modal.classList.remove("hidden");
  }
  
  function closeModal() {
    modal.classList.add("hidden");
  }
  