const { test, expect } = require("@playwright/test");

const cases = [
  {
    id: "Pos_Fun_0001",
    name: "Convert a complex short sentence",
    input: " oyaa enavaanam mama balan innavaa",
    expected: "ඔයා එනවානම් මම බලන් ඉන්නවා",
  },
  {
    id: "Pos_Fun_0002",
    name: "Short interrogative greeting",
    input: "oyaata kohomadha?",
    expected: "ඔයාට කොහොමද?",
  },
  {
    id: "Pos_Fun_0003",
    name: "Imperative command",
    input: "issarahata yanna",
    expected: "ඉස්සරහට යන්න",
  },
  {
    id: "Pos_Fun_0004",
    name: "Negative sentence",
    input: "mama ehema karannee naehae",
    expected: "මම එහෙම කරන්නේ නැහැ",
  },
  {
    id: "Pos_Fun_0005",
    name: "Past tense sentence",
    input: "mama iiyee gedhara giyaa",
    expected: "මම ඊයේ ගෙදර ගියා",
  },
  {
    id: "Pos_Fun_0006",
    name: "Future tense sentence",
    input: "api heta enavaa",
    expected: "අපි හෙට එනවා",
  },
  {
    id: "Pos_Fun_0007",
    name: "Joined word handling",
    input: "mama  gedhara  yanavaa",
    expected: "මම ගෙදර යනවා",
  },
  {
    id: "Pos_Fun_0008",
    name: "Slang greeting",
    input: "ela machan!",
    expected: "එල මචන්!",
  },
  {
    id: "Pos_Fun_0009",
    name: "Compound sentence",
    input: "api kaeema kanna yanavaa saha passe film ekak balanavaa",
    expected: "අපි කෑම කන්න යනවා සහ පස්සෙ film එකක් බලනවා",
  },
  {
    id: "Pos_Fun_0010",
    name: "Polite request",
    input: "karuNaakaralaa mata udhavvak karanna puLuvandha?",
    expected: "කරුණාකරලා මට උදව්වක් කරන්න පුළුවන්ද?",
  },
  {
    id: "Pos_Fun_0011",
    name: "Mixed Singlish + English",
    input: "adha Zoom meeting ekak thiyenavaa. passe email eka evanna puLuvandha?",
    expected: "අද Zoom meeting එකක් තියෙනවා. පස්සෙ email එක එවන්න පුළුවන්ද?",
  },
  {
    id: "Pos_Fun_0012",
    name: "Pronoun variation",
    input: "oyaalaa heta gedhara enavadha kiyala ammaa ahanavaa",
    expected: "ඔයාලා හෙට ගෙදර එනවද කියල අම්මා අහනවා",
  },
  {
    id: "Pos_Fun_0013",
    name: "Repeated words for emphasis",
    input: "hari hari lassanayi kiyala godak aya kivvaa",
    expected: "හරි හරි ලස්සනයි කියල ගොඩක් අය කිව්වා",
  },
  {
    id: "Pos_Fun_0014",
    name: "Long daily paragraph",
    input: "adha udhaeesanama mama office yanna hadhadhdhii hodhatama traffic. enna hari amaaruyi kiyala ahala mama poddak parakku unaa. passe office giyaama manager mata adha meeting ekakata enna kiyalaa kivvaa, aayee ehema unoth mata  raee venakan idhala, vaeda tika hariyata karalaa gedhara yanna kivvaa. gedhara aavama mata mahansiyata hodhatama nidhimathak aavaa. eenisaama mata TV bala bala idhdhii nindha giyaa",
    expected: "අද උදෑසනම මම office යන්න හදද්දී හොදටම traffic. එන්න හරි අමාරුයි කියල අහල මම පොඩ්ඩක් පරක්කු උනා. පස්සෙ office ගියාම manager මට අද meeting එකකට එන්න කියලා කිව්වා, ආයේ එහෙම උනොත් මට  රෑ වෙනකන් ඉදල, වැඩ ටික හරියට කරලා ගෙදර යන්න කිව්වා. ගෙදර ආවම මට මහන්සියට හොදටම නිදිමතක් ආවා. ඒනිසාම මට TV බල බල ඉද්දී නින්ද ගියා",
  },
  {
    id: "Pos_Fun_0015",
    name: "Currency and numbers",
    input: "mata Rs. 5000 vitharayi thiyennee kiyalaa mama kalinma kivvaa",
    expected: "මට Rs. 5000 විතරයි තියෙන්නේ කියලා  මම කලින්ම කිව්වා",
  },
  {
    id: "Pos_Fun_0016",
    name: "Multi-line input",
    input: "mama gedhara yanavaa. oyaa enavadha?",
    expected: "මම ගෙදර යනවා. ඔයා එනවද?",
  },
  {
    id: "Pos_Fun_0017",
    name: "Informal request",
    input: "eeka poddak balala mata kiyanna puluvannam",
    expected: "ඒක පොඩ්ඩක් බලල මට කියන්න පුලුවන්නම්",
  },
  {
    id: "Pos_Fun_0018",
    name: "Long mixed Singlish + English paragraph",
    input: "adha mama office giyaama Zoom meeting ekak thiyenavaa kiyala email ekak aavaa. iita passee manager mata documents tika email ekakata attach karala evanna kiyalaa kivvaa. mama eeka karala ivara unaata passee WhatsApp message ekak dhaemmoth hari kiyala hithunaa. meeting eka ivara unaata passee mama office vaeda tika okkoma ivara karalaa raee gedhara enna hadhannee",
    expected: "අද මම office ගියාම Zoom meeting එකක් තියෙනවා කියල email එකක් ආවා. ඊට පස්සේ manager මට documents ටික email එකකට attach කරල එවන්න කියලා කිව්වා. මම ඒක කරල ඉවර උනාට පස්සේ WhatsApp message එකක් දැම්මොත් හරි කියල හිතුනා. meeting එක ඉවර උනාට පස්සේ මම office වැඩ ටික ඔක්කොම ඉවර කරලා රෑ ගෙදර එන්න හදන්නේ",
  },
  {
    id: "Pos_Fun_0019",
    name: "Long mixed Singlish + English paragraph",
    input: "mama adha udhaeesana vaedata yanna laeesthi venakota hodhatama vahinna patan gaththaa. ee unath mama umbrella ekak aran paare yana gaman bus ekakata goda unaa. traffic nisaa mata  poddak kaLin office ekata yanna baeri unaa. passe  hari amaaruven  unath mama office gihin vaeda tika hariyata karalaa manager gee approval eka gaththaa",
    expected: "මම අද උදෑසන වැඩට යන්න ලෑස්ති වෙනකොට හොදටම වහින්න පටන් ගත්තා. ඒ උනත් මම umbrella එකක් අරන් පාරෙ යන ගමන් bus එකකට ගොඩ උනා. traffic නිසා මට  පොඩ්ඩක් කළින් office එකට යන්න බැරි උනා. පස්සෙ  හරි අමාරුවෙන්  උනත් මම office ගිහින් වැඩ ටික හරියට කරලා manager ගේ approval එක ගත්තා",
  },
  {
    id: "Pos_Fun_0020",
    name: "Long narrative past tense",
    input: "edhaa 2026-05-21 ,mama office yanna laeesthi venakota mata athee Rs. 5000 vitharayi  thiyennee kiyala mathak unaa. iita passe mama ATM ekata gihilla salli aran passe 7.30 AM venakota office ekata aavaa. rae 8.00 PM venakota mata  vaeda tika ivara karalaa gedhara enna puluvan unaa.ee nisaa mata edhaa godak sathutu hithunaa",
    expected: "එදා 2026-05-21 ,මම office යන්න ලෑස්ති වෙනකොට මට අතේ Rs. 5000 විතරයි  තියෙන්නේ කියල මතක් උනා. ඊට පස්සෙ මම ATM එකට ගිහිල්ල සල්ලි අරන් පස්සෙ 7.30 AM වෙනකොට office එකට ආවා. රැ 8.00 PM වෙනකොට මට  වැඩ ටික ඉවර කරලා ගෙදර එන්න පුලුවන් උනා.ඒ නිසා මට එදා ගොඩක් සතුටු හිතුනා",
  },
  {
    id: "Pos_Fun_0021",
    name: "Convert a long paragraph",
    input: "dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 430k vinaashayata pathva aethi athara, ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava pravaahana, mahaamaarga saha naagarika sQQvarDhana amaathYA bimal rathnaayaka saDHahan kaLeeya",
    expected: "දිට්වා සුළි කුණාටුව සමඟ ඇති වූ ගංවතුර සහ නායයෑම් හේතුවෙන් මාර්ග සංවර්ධන අධිකාරිය සතු මාර්ග කොටස් 430ක් විනාශයට පත්ව ඇති අතර, එහි සමස්ත දිග ප්‍රමාණය කිලෝමීටර් 300ක් පමණ වන බව ප්‍රවාහන, මහාමාර්ග සහ නාගරික සංවර්ධන අමාත්‍ය බිමල් රත්නායක සඳහන් කළේය",
  },
  {
    id: "Pos_Fun_0022",
    name: "Convert a mixed language with brand term",
    input: "Teams meeting ekee link eka WhatsApp karanna puLuvandha?",
    expected: "Teams meeting එකේ link එක WhatsApp කරන්න පුළුවන්ද?",
  },
  {
    id: "Pos_Fun_0023",
    name: "Convert a polite request",
    input: "karuNaakaralaa mata podi udhavvak karanna puLuvandha?",
    expected: "කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?",
  },
  {
    id: "Pos_Fun_0024",
    name: "Convert a short greeting",
    input: "aayuboovan!",
    expected: "ආයුබෝවන්!",
  }
];

test.describe("SwiftTranslator - Positive functional tests", () => {
  for (const tc of cases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.goto("https://www.swifttranslator.com/");

      const inputBox = page.getByRole("textbox", {
        name: "Input Your Singlish Text Here.",
      });

      await inputBox.fill(tc.input);

      // Assert expected Sinhala appears
      await expect(page.getByText(tc.expected)).toBeVisible();
    });
  }
});
