const puppeteer = require("puppeteer")
require('dotenv').config()

const ENTRY_URL = "https://jlptonline.or.id/test"

async function initBrowser() {
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized' ] })
    const page = await browser.newPage()
    await page.setViewport({ width: 1444, height: 800});
    await page.goto(ENTRY_URL)
    return page
}

async function fillLoginForm(page) {
    // INPUT EMAIL & PASSWORD ✅
    await page.waitForTimeout(800);
    await page.type("input[id='email']", process.env.EMAIL)
    await page.waitForTimeout(100);
    await page.type("input[id='password']", process.env.PASSWORD)
    await page.waitForTimeout(100);

    // CHECK REMEMBER ME ✅
    const check = await page.$("input[id='rememberMe']")
    await check.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CLICK SUBMIT BUTTON
    await page.click("button[type='submit']")
}

async function selectLevelAndLocation(page) {
    await page.waitForTimeout(1500)

    // CLICK LOCATION DROPDOWN ✅
    const locationDropdown = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[1]')
    await locationDropdown.click()
    await page.waitForTimeout(500)

    // SELECT LOCATION ✅
    //!! 2 = Jakarta; 5 = Medan;
    const locationSelect = await page.waitForXPath('//*[@id="choices--location-item-choice-2"]')
    await locationSelect.click()
    await page.waitForTimeout(800)

    // CLICK LEVEL DROPDOWN ✅
    const levelDropdown = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[3]/div/div[1]')
    await levelDropdown.click()
    await page.waitForTimeout(500)

    // SELECT LEVEL ✅
    const levelSelect = await page.waitForXPath('//*[@id="choices--grade-item-choice-4"]')
    await levelSelect.click()
    await page.waitForTimeout(800)

    // CLICK FILTERED TEST ROW ✅
    const buttonN3 = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[4]/div/table/tbody/tr/td[6]/a')
    await buttonN3.click()
}

async function fillRegistrationForm(page) {
    await page.waitForTimeout(2000)

    // CLOSE "PERINGATAN KUOTA" MODAL ✅
    const modal1Button = await page.waitForXPath('//*[@id="modal-alert"]/div/div/div/div[3]/button')
    await modal1Button.click()
    await page.waitForTimeout(1000)

    // CLICK "PILIH FOTO" BUTTON ✅
    const [fileChooser] = await Promise.all([
      page.waitForFileChooser(),
      page.click("#userApp > section > div > div > div:nth-child(2) > div > div.col-lg-2.mb-4.mb-lg-0 > div.d-grid"),
    ]);

    // ACCEPT PHOTO ✅
    await fileChooser.accept([process.env.PHOTO_PATH]);
    await page.waitForTimeout(1000)

    // CLOSE "PHOTO MENYULITKAN" MODAL ✅
    const modal2Button = await page.waitForXPath('//*[@id="modal-alert"]/div/div/div/div[3]/button')
    await modal2Button.click()
    await page.waitForTimeout(700)

    // CLICK "CROP FOTO" BUTTON ✅
    const cropButton = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[1]/div[2]/button')
    await cropButton.click()
    await page.waitForTimeout(500)

    // INPUT "TANGGAL LAHIR" ✅
    await page.type("input[id='tanggal_lahir']", process.env.BIRTH_DATE)
    await page.waitForTimeout(100);

    // CLICK "JENIS KELAMIN" DROPDOWN ✅
    const genderDropdown = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[2]/div[1]/div[3]/div/div[1]')
    await genderDropdown.click()
    await page.waitForTimeout(500)

    // SELECT "JENIS KELAMIN" ✅
    const genderSelect = await page.waitForXPath('//*[@id="choices--jenis_kelamin-item-choice-1"]')
    await genderSelect.click()
    await page.waitForTimeout(800)

    // CLICK "BAHASA UTAMA" DROPDOWN ✅
    const mainLangDropdown = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[2]/div[1]/div[4]/div/div[1]')
    await mainLangDropdown.click()
    await page.waitForTimeout(500)

    // SELECT "BAHASA UTAMA" ✅
    const mainLangSelect = await page.waitForXPath('//*[@id="choices--bahasa-item-choice-10"]')
    await mainLangSelect.click()
    await page.waitForTimeout(800)

    // TYPE "ALAMAT" ✅
    await page.type("textarea[id='alamat']", process.env.ADDRESS)
    await page.waitForTimeout(800)

    // CLICK "PROVINSI" DROPDOWN ✅
    const provinceDropdown = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[2]/div[1]/div[6]/div/div[1]')
    await provinceDropdown.click()
    await page.waitForTimeout(500)

    // SELECT "PROVINSI" ✅
    const provinceSelect = await page.waitForXPath('//*[@id="choices--provinsi-item-choice-9"]')
    await provinceSelect.click()
    await page.waitForTimeout(800)

    // CLICK "KOTA" DROPDOWN ✅
    const cityDropdown = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[2]/div[1]/div[7]/div/div[1]')
    await cityDropdown.click()
    await page.waitForTimeout(500)

    // SELECT "KOTA" ✅
    const citySelect = await page.waitForXPath('//*[@id="choices--city-item-choice-24"]')
    await citySelect.click()
    await page.waitForTimeout(800)

    // TYPE "KODE POS" ✅
    await page.type("input[id='postal_code']", '17148')
    await page.waitForTimeout(800)

    // TYPE "KODE PIN UNTUK MELIHAT HASIL UJIAN" ✅
    await page.type("input[id='passcode']", process.env.PASSCODE)
    await page.waitForTimeout(800)

    // TYPE "NOMOR TELEPON" ✅
    await page.type("input[id='telephone']", process.env.PHONE_NUMBER)
    await page.waitForTimeout(800)

    // CLICK "TEMPAT BELAJAR BAHASA JEPANG" DROPDOWN ✅
    const learnLocDropdown = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[2]/div[2]/div[1]/div/div[1]')
    await learnLocDropdown.click()
    await page.waitForTimeout(500)

    // SELECT "TEMPAT BELAJAR BAHASA JEPANG" ✅
    const learnLocSelect = await page.waitForXPath('//*[@id="choices--course_place-item-choice-4"]')
    await learnLocSelect.click()
    await page.waitForTimeout(800)
    
    // CLICK "ALASAN MENGIKUTI UJIAN" DROPDOWN ✅
    const reasonDropdown = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[2]/div[2]/div[2]/div/div[1]')
    await reasonDropdown.click()
    await page.waitForTimeout(500)

    // SELECT "ALASAN MENGIKUTI UJIAN" ✅
    const reasonSelect = await page.waitForXPath('//*[@id="choices--reason-item-choice-6"]')
    await reasonSelect.click()
    await page.waitForTimeout(800)

    // CLICK "PEKERJAAN" DROPDOWN ✅
    const professionDropdown = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[2]/div[2]/div[3]/div/div[1]')
    await professionDropdown.click()
    await page.waitForTimeout(500)

    // SELECT "PEKERJAAN" ✅
    const professionSelect = await page.waitForXPath('//*[@id="choices--profession-item-choice-5"]')
    await professionSelect.click()
    await page.waitForTimeout(800)

    // CLICK "DETAIL PEKERJAAN" DROPDOWN ✅
    const detailProfessionDropdown = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[2]/div[2]/div[4]/div/div[1]')
    await detailProfessionDropdown.click()
    await page.waitForTimeout(500)

    // SELECT "DETAIL PEKERJAAN" ✅
    const detailProfessionSelect = await page.waitForXPath('//*[@id="choices--use-item-choice-3"]')
    await detailProfessionSelect.click()
    await page.waitForTimeout(800)

    // CHECK "PENGALAMAN MEDIA JEPANG" (ANIMASI) ✅
    const checkAnimation = await page.$('input[id="29"]')
    await checkAnimation.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN MEDIA JEPANG" (ARTIKEL WEBSITE) ✅
    const checkArticle = await page.$('input[id="33"]')
    await checkArticle.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN MEDIA JEPANG" (DRAMA) ✅
    const checkDrama = await page.$('input[id="28"]')
    await checkDrama.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN MEDIA JEPANG" (KOMIK) ✅
    const checkComic = await page.$('input[id="32"]')
    await checkComic.evaluate(c => c.click())
    await page.waitForTimeout(200);


    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (GURU - BERBICARA) ✅
    const checkTeacherSpeaking = await page.$('input[id="with_teacher_36"]')
    await checkTeacherSpeaking.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (GURU - MENDENGAR) ✅
    const checkTeacherListening = await page.$('input[id="with_teacher_37"]')
    await checkTeacherListening.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (GURU - MEMBACA) ✅
    const checkTeacherReading = await page.$('input[id="with_teacher_38"]')
    await checkTeacherReading.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (TEMAN - MENDENGAR) ✅
    const checkFriendListening = await page.$('input[id="with_friend_42"]')
    await checkFriendListening.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (TEMAN - MEMBACA) ✅
    const checkFriendReading = await page.$('input[id="with_friend_43"]')
    await checkFriendReading.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (TEMAN - MENULIS) ✅
    const checkFriendWriting = await page.$('input[id="with_friend_44"]')
    await checkFriendWriting.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (KELUARGA - NONE) ✅
    const checkFamilyNone = await page.$('input[id="with_family_50"]')
    await checkFamilyNone.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (ATASAN - NONE) ✅
    const checkBossNone = await page.$('input[id="with_boss_55"]')
    await checkBossNone.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (KOLEGA - SPEAKING) ✅
    const checkColleagueSpeaking = await page.$('input[id="with_colleague_56"]')
    await checkColleagueSpeaking.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (KOLEGA - LISTENING) ✅
    const checkColleagueListening = await page.$('input[id="with_colleague_57"]')
    await checkColleagueListening.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "PENGALAMAN KOMUNIKASI BAHASA JEPANG" (PELANGGAN - NONE) ✅
    const checkCustomerNone = await page.$('input[id="with_customer_65"]')
    await checkCustomerNone.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CHECK "SAYA SETUJU" ✅
    const checkIAgree = await page.$('input[id="saya-setuju"]')
    await checkIAgree.evaluate(c => c.click())
    await page.waitForTimeout(200);

    // CLICK "MENUJU PEMBAYARAN" ✅
    const submit1Button = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[2]/div/div[2]/div[7]/div[3]/div/button')
    await submit1Button.click() // CLICK FOR CONFIRM
    await page.waitForTimeout(1500)

    const submit2Button = await page.waitForXPath('//*[@id="userApp"]/section/div/div/div[3]/div/div[2]/div[7]/div[3]/div/button')
    await submit2Button.click() // CLICK FOR SUBMIT
    await page.waitForTimeout(1000)

    // CLOSE "KUOTA ANDA AKAN HANGUS" MODAL ✅
    const modalToPaymentButton = await page.waitForXPath('//*[@id="menuju-pembayaran"]/div/div/div/div[3]/button[2]')
    await modalToPaymentButton.click()
}

async function selectPaymentMethod(page) {
    await page.waitForTimeout(1000)
    
    // SELECT "GOPAY METHOD" ✅
    const selectGopay = await page.waitForXPath('//*[@id="list-pembayaran"]/div/div/div[3]/div[6]/label')
    await selectGopay.click()
    await page.waitForTimeout(800)

    // CLICK "BAYAR" TO PAY ✅
    const payButton = await page.waitForXPath('//*[@id="list-pembayaran"]/div/div/div[4]/button')
    await payButton.click()
}

// TODO: TEST REAL DATA JAKARTA N3 SCENARIO
// TODO: TEST SUBMIT TO PAYMENT SCENARIO (MEDAN N3 ONLY) ✅✅✅

//!! 👇🏼👇🏼👇🏼👇🏼 JANGAN LUPA SEBELUM RUN REAL SCENARIO JAM 9 👇🏼👇🏼👇🏼👇🏼
//!! GANTI AKUN KE abuaziscorp@gmail.com (.env) & GANTI LOKASI KE JAKARTA = 2
//!! UNCOMMENT FUNCTION selectPaymentMethod()

async function submitForm() {
    const page = await initBrowser()
    await fillLoginForm(page)
    await selectLevelAndLocation(page)
    await fillRegistrationForm(page)
    await selectPaymentMethod(page)
}

submitForm()