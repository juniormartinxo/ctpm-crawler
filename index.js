require('dotenv').config()
const puppeteer = require('puppeteer')
const path = require('path')
let fs = require('fs')

const stage = '1'
const unity = '9964'
const waitingTime = 3000

const segmentes_ef1_initial = ['12101', '12201', '12301']

const segmentes_ef1_final = ['12401', '12501', '12502']

const segmentes_ef2 = ['11701', '11702', '12801', '12802', '12901', '12902']

const segmentes_em = ['21101', '21102', '21201', '21202', '21301', '21302']

const structures = [
  {
    EF1_INITIAL: [
      {
        12101: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        12201: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        12301: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
        ],
      },
    ],
  },
  {
    EF1_FINAL: [
      {
        12401: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        12501: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        12502: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
        ],
      },
    ],
  },
  {
    EF2: [
      {
        12601: [
          '002 - LINGUA PORTUGUESA',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '434 - LABORATORIO/CIENCIAS',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        12602: [
          '002 - LINGUA PORTUGUESA',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '434 - LABORATORIO/CIENCIAS',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        11701: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '434 - LABORATORIO/CIENCIAS',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        11702: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '434 - LABORATORIO/CIENCIAS',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        12801: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '434 - LABORATORIO/CIENCIAS',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        12802: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '434 - LABORATORIO/CIENCIAS',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        12901: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '434 - LABORATORIO/CIENCIAS',
          '601 - LINGUA INGLESA',
        ],
      },
      {
        12902: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '019 - CIENCIAS',
          '025 - ENSINO RELIGIOSO',
          '490 - ARTE',
          '434 - LABORATORIO/CIENCIAS',
          '601 - LINGUA INGLESA',
        ],
      },
    ],
  },
  {
    EM: [
      {
        21101: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '021 - BIOLOGIA',
          '026 - FISICA',
          '027 - QUIMICA',
          '490 - ARTE',
          '028 - SOCIOLOGIA',
          '030 - FILOSOFIA',
          '512 - LITERATURA',
          '116 - L.INGLESA NA PRATICA',
          '208 - PROJETO DE VIDA',
          '433 - LAB.QUIMICA',
          '435 - LABORATORIO/BIOLOGIA',
          '544 - OFICINA DE TEXTO',
          '601 - LINGUA INGLESA',
          '783 - LABORATORIO DE FIS.',
        ],
      },
      {
        21102: [
          '002 - LINGUA PORTUGUESA',
          '004 - LING ESTR MOD INGLES',
          '007 - REDACAO E EXPRESSAO',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '021 - BIOLOGIA',
          '026 - FISICA',
          '027 - QUIMICA',
          '490 - ARTE',
          '028 - SOCIOLOGIA',
          '030 - FILOSOFIA',
          '512 - LITERATURA',
          '116 - L.INGLESA NA PRATICA',
          '208 - PROJETO DE VIDA',
          '433 - LAB.QUIMICA',
          '435 - LABORATORIO/BIOLOGIA',
          '544 - OFICINA DE TEXTO',
          '601 - LINGUA INGLESA',
          '783 - LABORATORIO DE FIS.',
        ],
      },
      {
        21201: [
          '002 - LINGUA PORTUGUESA',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '021 - BIOLOGIA',
          '026 - FISICA',
          '027 - QUIMICA',
          '028 - SOCIOLOGIA',
          '030 - FILOSOFIA',
          '433 - LAB.QUIMICA',
          '435 - LABORATORIO/BIOLOGIA',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
          '783 - LABORATORIO DE FIS.',
          '116 - L.INGLESA NA PRATICA',
          '208 - PROJETO DE VIDA',
          '254 - APROFUN.LIN. PORTUGU',
          '257 - APROF. SOCIOLOGIA',
          '258 - APROF. MATEMATICA',
          '259 - APROFUNDAMEN. FISICA',
          '544 - OFICINA DE TEXTO',
        ],
      },
      {
        21202: [
          '002 - LINGUA PORTUGUESA',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '021 - BIOLOGIA',
          '026 - FISICA',
          '027 - QUIMICA',
          '028 - SOCIOLOGIA',
          '030 - FILOSOFIA',
          '433 - LAB.QUIMICA',
          '435 - LABORATORIO/BIOLOGIA',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
          '783 - LABORATORIO DE FIS.',
          '116 - L.INGLESA NA PRATICA',
          '208 - PROJETO DE VIDA',
          '254 - APROFUN.LIN. PORTUGU',
          '257 - APROF. SOCIOLOGIA',
          '258 - APROF. MATEMATICA',
          '259 - APROFUNDAMEN. FISICA',
          '544 - OFICINA DE TEXTO',
        ],
      },
      {
        21301: [
          '002 - LINGUA PORTUGUESA',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '021 - BIOLOGIA',
          '026 - FISICA',
          '027 - QUIMICA',
          '028 - SOCIOLOGIA',
          '030 - FILOSOFIA',
          '433 - LAB.QUIMICA',
          '435 - LABORATORIO/BIOLOGIA',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
          '783 - LABORATORIO DE FIS.',
        ],
      },
      {
        21302: [
          '002 - LINGUA PORTUGUESA',
          '009 - GEOGRAFIA',
          '010 - HISTORIA',
          '012 - EDUCACAO FISICA',
          '017 - MATEMATICA',
          '021 - BIOLOGIA',
          '026 - FISICA',
          '027 - QUIMICA',
          '028 - SOCIOLOGIA',
          '030 - FILOSOFIA',
          '433 - LAB.QUIMICA',
          '435 - LABORATORIO/BIOLOGIA',
          '490 - ARTE',
          '601 - LINGUA INGLESA',
          '783 - LABORATORIO DE FIS.',
        ],
      },
    ],
  },
]

//console.log(structures[0].EF1_INITIAL)

for (const [i, structure] of structures.entries()) {
  const EF1_INITIAL = structure.EF1_INITIAL
}

console.log(EF1_INITIAL)

/*
structures.map(segment => {
  Object.keys(segment).map(_class => {
    console.log(`\n-----------------\n${_class}\n-----------------\n`)

    segment[_class].map(segment_id => {
      Object.keys(segment_id).map(discipline => {
        console.log(discipline)

        segment_id[discipline].map(discipline_id => {
          console.log(discipline_id)
        })
      })
    })
  })
})

//console.log(segmentes)
;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })

  const page = await browser.newPage()

  await page._client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.resolve(__dirname, 'files'),
  })

  await page.goto(process.env.URL_ROOT)

  await page.waitForSelector('#textLogin')
  await page.type('#textLogin', process.env.USER)

  await page.waitForSelector('#senha')
  await page.type('#senha', process.env.PASS)

  await page.waitForNavigation()

  await page.goto(process.env.URL_REPORTS)

  await page.waitForNavigation()

  await structures.map(async segment => {
    await Object.keys(segment).map(async segment_name => {
      await console.log(
        `\n-----------------\n${segment_name}\n-----------------\n`,
      )

      await segment[segment_name].map(async class_name => {
        await Object.keys(class_name).map(async discipline => {
          await console.log(discipline)

          await class_name[discipline].map(async discipline_id => {
            await console.log(discipline_id)
            await page.waitForSelector('#etapa')
            await page.type('#etapa', stage)
            await page.type('#etapa', stage)
            await page.waitForTimeout(2000)
            await page.type('#etapa', stage)
            await page.type('#etapa', stage)

            await page.waitForTimeout(waitingTime)

            await page.waitForSelector('#unidade')
            await page.type('#unidade', unity)
            await page.type('#unidade', unity)
            await page.waitForTimeout(2000)
            await page.type('#unidade', unity)
            await page.type('#unidade', unity)

            await page.waitForTimeout(waitingTime)

            await page.waitForSelector('#turma')
            await page.type('#turma', String(class_name))
            await page.type('#turma', String(class_name))
            await page.waitForTimeout(2000)
            await page.type('#turma', String(class_name))
            await page.type('#turma', String(class_name))

            await page.waitForTimeout(waitingTime)

            await page.waitForSelector('#disciplina')
            await page.type('#disciplina', String(discipline_id))
            await page.type('#disciplina', String(discipline_id))
            await page.waitForTimeout(2000)
            await page.type('#disciplina', String(discipline_id))
            await page.type('#disciplina', String(discipline_id))

            await page.waitForTimeout(waitingTime)

            await page.waitForSelector('[type="submit"]')
            await page.click('[type="submit"]')
          })
        })
      })
    })
  })

  //type="submit"
  //value="Gerar"

  // await browser.close();
})()
*/
