export * from './fund.constants'
export * from './gradient.constants'
export * from './method.constants'
export const GAME_LEVELS: Record<
  string,
  {
    id: number
    name: string
    description: string
    progress: number
  }
> = {
  LEVEL_1: {
    id: 1,
    name: 'Level 1',
    description: 'Level 1 description',
    progress: 1 / 7
  },
  LEVEL_2: {
    id: 2,
    name: 'Level 2',
    description: 'Level 2 description',
    progress: 2 / 7
  },
  LEVEL_3: {
    id: 3,
    name: 'Level 3',
    description: 'Level 3 description',
    progress: 3 / 7
  },
  LEVEL_4: {
    id: 4,
    name: 'Level 4',
    description: 'Level 4 description',
    progress: 4 / 7
  },
  LEVEL_5: {
    id: 5,
    name: 'Level 5',
    description: 'Level 5 description',
    progress: 5 / 7
  },
  LEVEL_6: {
    id: 6,
    name: 'Level 6',
    description: 'Level 6 description',
    progress: 6 / 7
  },
  LEVEL_7: {
    id: 7,
    name: 'Level 7',
    description: 'Level 7 description',
    progress: 7 / 7
  }
}

export const COUNTRIES = [
  {
    label: 'Afghanistan',
    value: 'AF',
    flag: 'https://flagcdn.com/w40/af.png'
  },
  {
    label: 'Albania',
    value: 'AL',
    flag: 'https://flagcdn.com/w40/al.png'
  },
  {
    label: 'Algeria',
    value: 'DZ',
    flag: 'https://flagcdn.com/w40/dz.png'
  },
  {
    label: 'Andorra',
    value: 'AD',
    flag: 'https://flagcdn.com/w40/ad.png'
  },
  {
    label: 'Angola',
    value: 'AO',
    flag: 'https://flagcdn.com/w40/ao.png'
  },
  {
    label: 'Antigua and Barbuda',
    value: 'AG',
    flag: 'https://flagcdn.com/w40/ag.png'
  },
  {
    label: 'Argentina',
    value: 'AR',
    flag: 'https://flagcdn.com/w40/ar.png'
  },
  {
    label: 'Armenia',
    value: 'AM',
    flag: 'https://flagcdn.com/w40/am.png'
  },
  {
    label: 'Australia',
    value: 'AU',
    flag: 'https://flagcdn.com/w40/au.png'
  },
  {
    label: 'Austria',
    value: 'AT',
    flag: 'https://flagcdn.com/w40/at.png'
  },
  {
    label: 'Azerbaijan',
    value: 'AZ',
    flag: 'https://flagcdn.com/w40/az.png'
  },
  {
    label: 'Bahamas',
    value: 'BS',
    flag: 'https://flagcdn.com/w40/bs.png'
  },
  {
    label: 'Bahrain',
    value: 'BH',
    flag: 'https://flagcdn.com/w40/bh.png'
  },
  {
    label: 'Bangladesh',
    value: 'BD',
    flag: 'https://flagcdn.com/w40/bd.png'
  },
  {
    label: 'Barbados',
    value: 'BB',
    flag: 'https://flagcdn.com/w40/bb.png'
  },
  {
    label: 'Belarus',
    value: 'BY',
    flag: 'https://flagcdn.com/w40/by.png'
  },
  {
    label: 'Belgium',
    value: 'BE',
    flag: 'https://flagcdn.com/w40/be.png'
  },
  {
    label: 'Belize',
    value: 'BZ',
    flag: 'https://flagcdn.com/w40/bz.png'
  },
  {
    label: 'Benin',
    value: 'BJ',
    flag: 'https://flagcdn.com/w40/bj.png'
  },
  {
    label: 'Bhutan',
    value: 'BT',
    flag: 'https://flagcdn.com/w40/bt.png'
  },
  {
    label: 'Bolivia',
    value: 'BO',
    flag: 'https://flagcdn.com/w40/bo.png'
  },
  {
    label: 'Bosnia and Herzegovina',
    value: 'BA',
    flag: 'https://flagcdn.com/w40/ba.png'
  },
  {
    label: 'Botswana',
    value: 'BW',
    flag: 'https://flagcdn.com/w40/bw.png'
  },
  {
    label: 'Brazil',
    value: 'BR',
    flag: 'https://flagcdn.com/w40/br.png'
  },
  {
    label: 'Brunei',
    value: 'BN',
    flag: 'https://flagcdn.com/w40/bn.png'
  },
  {
    label: 'Bulgaria',
    value: 'BG',
    flag: 'https://flagcdn.com/w40/bg.png'
  },
  {
    label: 'Burkina Faso',
    value: 'BF',
    flag: 'https://flagcdn.com/w40/bf.png'
  },
  {
    label: 'Burundi',
    value: 'BI',
    flag: 'https://flagcdn.com/w40/bi.png'
  },
  {
    label: 'Cambodia',
    value: 'KH',
    flag: 'https://flagcdn.com/w40/kh.png'
  },
  {
    label: 'Cameroon',
    value: 'CM',
    flag: 'https://flagcdn.com/w40/cm.png'
  },
  {
    label: 'Canada',
    value: 'CA',
    flag: 'https://flagcdn.com/w40/ca.png'
  },
  {
    label: 'Cape Verde',
    value: 'CV',
    flag: 'https://flagcdn.com/w40/cv.png'
  },
  {
    label: 'Central African Republic',
    value: 'CF',
    flag: 'https://flagcdn.com/w40/cf.png'
  },
  {
    label: 'Chad',
    value: 'TD',
    flag: 'https://flagcdn.com/w40/td.png'
  },
  {
    label: 'Chile',
    value: 'CL',
    flag: 'https://flagcdn.com/w40/cl.png'
  },
  {
    label: 'China',
    value: 'CN',
    flag: 'https://flagcdn.com/w40/cn.png'
  },
  {
    label: 'Colombia',
    value: 'CO',
    flag: 'https://flagcdn.com/w40/co.png'
  },
  {
    label: 'Comoros',
    value: 'KM',
    flag: 'https://flagcdn.com/w40/km.png'
  },
  {
    label: 'Congo',
    value: 'CG',
    flag: 'https://flagcdn.com/w40/cg.png'
  },
  {
    label: 'Costa Rica',
    value: 'CR',
    flag: 'https://flagcdn.com/w40/cr.png'
  },
  {
    label: 'Croatia',
    value: 'HR',
    flag: 'https://flagcdn.com/w40/hr.png'
  },
  {
    label: 'Cuba',
    value: 'CU',
    flag: 'https://flagcdn.com/w40/cu.png'
  },
  {
    label: 'Cyprus',
    value: 'CY',
    flag: 'https://flagcdn.com/w40/cy.png'
  },
  {
    label: 'Czech Republic',
    value: 'CZ',
    flag: 'https://flagcdn.com/w40/cz.png'
  },
  {
    label: 'Denmark',
    value: 'DK',
    flag: 'https://flagcdn.com/w40/dk.png'
  },
  {
    label: 'Djibouti',
    value: 'DJ',
    flag: 'https://flagcdn.com/w40/dj.png'
  },
  {
    label: 'Dominica',
    value: 'DM',
    flag: 'https://flagcdn.com/w40/dm.png'
  },
  {
    label: 'Dominican Republic',
    value: 'DO',
    flag: 'https://flagcdn.com/w40/do.png'
  },
  {
    label: 'Ecuador',
    value: 'EC',
    flag: 'https://flagcdn.com/w40/ec.png'
  },
  {
    label: 'Egypt',
    value: 'EG',
    flag: 'https://flagcdn.com/w40/eg.png'
  },
  {
    label: 'El Salvador',
    value: 'SV',
    flag: 'https://flagcdn.com/w40/sv.png'
  },
  {
    label: 'Equatorial Guinea',
    value: 'GQ',
    flag: 'https://flagcdn.com/w40/gq.png'
  },
  {
    label: 'Eritrea',
    value: 'ER',
    flag: 'https://flagcdn.com/w40/er.png'
  },
  {
    label: 'Estonia',
    value: 'EE',
    flag: 'https://flagcdn.com/w40/ee.png'
  },
  {
    label: 'Eswatini',
    value: 'SZ',
    flag: 'https://flagcdn.com/w40/sz.png'
  },
  {
    label: 'Ethiopia',
    value: 'ET',
    flag: 'https://flagcdn.com/w40/et.png'
  },
  {
    label: 'Fiji',
    value: 'FJ',
    flag: 'https://flagcdn.com/w40/fj.png'
  },
  {
    label: 'Finland',
    value: 'FI',
    flag: 'https://flagcdn.com/w40/fi.png'
  },
  {
    label: 'France',
    value: 'FR',
    flag: 'https://flagcdn.com/w40/fr.png'
  },
  {
    label: 'Gabon',
    value: 'GA',
    flag: 'https://flagcdn.com/w40/ga.png'
  },
  {
    label: 'Gambia',
    value: 'GM',
    flag: 'https://flagcdn.com/w40/gm.png'
  },
  {
    label: 'Georgia',
    value: 'GE',
    flag: 'https://flagcdn.com/w40/ge.png'
  },
  {
    label: 'Germany',
    value: 'DE',
    flag: 'https://flagcdn.com/w40/de.png'
  },
  {
    label: 'Ghana',
    value: 'GH',
    flag: 'https://flagcdn.com/w40/gh.png'
  },
  {
    label: 'Greece',
    value: 'GR',
    flag: 'https://flagcdn.com/w40/gr.png'
  },
  {
    label: 'Grenada',
    value: 'GD',
    flag: 'https://flagcdn.com/w40/gd.png'
  },
  {
    label: 'Guatemala',
    value: 'GT',
    flag: 'https://flagcdn.com/w40/gt.png'
  },
  {
    label: 'Guinea',
    value: 'GN',
    flag: 'https://flagcdn.com/w40/gn.png'
  },
  {
    label: 'Guinea-Bissau',
    value: 'GW',
    flag: 'https://flagcdn.com/w40/gw.png'
  },
  {
    label: 'Guyana',
    value: 'GY',
    flag: 'https://flagcdn.com/w40/gy.png'
  },
  {
    label: 'Haiti',
    value: 'HT',
    flag: 'https://flagcdn.com/w40/ht.png'
  },
  {
    label: 'Honduras',
    value: 'HN',
    flag: 'https://flagcdn.com/w40/hn.png'
  },
  {
    label: 'Hungary',
    value: 'HU',
    flag: 'https://flagcdn.com/w40/hu.png'
  },
  {
    label: 'Iceland',
    value: 'IS',
    flag: 'https://flagcdn.com/w40/is.png'
  },
  {
    label: 'India',
    value: 'IN',
    flag: 'https://flagcdn.com/w40/in.png'
  },
  {
    label: 'Indonesia',
    value: 'ID',
    flag: 'https://flagcdn.com/w40/id.png'
  },
  {
    label: 'Iran',
    value: 'IR',
    flag: 'https://flagcdn.com/w40/ir.png'
  },
  {
    label: 'Iraq',
    value: 'IQ',
    flag: 'https://flagcdn.com/w40/iq.png'
  },
  {
    label: 'Ireland',
    value: 'IE',
    flag: 'https://flagcdn.com/w40/ie.png'
  },
  {
    label: 'Israel',
    value: 'IL',
    flag: 'https://flagcdn.com/w40/il.png'
  },
  {
    label: 'Italy',
    value: 'IT',
    flag: 'https://flagcdn.com/w40/it.png'
  },
  {
    label: 'Jamaica',
    value: 'JM',
    flag: 'https://flagcdn.com/w40/jm.png'
  },
  {
    label: 'Japan',
    value: 'JP',
    flag: 'https://flagcdn.com/w40/jp.png'
  },
  {
    label: 'Jordan',
    value: 'JO',
    flag: 'https://flagcdn.com/w40/jo.png'
  },
  {
    label: 'Kazakhstan',
    value: 'KZ',
    flag: 'https://flagcdn.com/w40/kz.png'
  },
  {
    label: 'Kenya',
    value: 'KE',
    flag: 'https://flagcdn.com/w40/ke.png'
  },
  {
    label: 'Kiribati',
    value: 'KI',
    flag: 'https://flagcdn.com/w40/ki.png'
  },
  {
    label: 'Kuwait',
    value: 'KW',
    flag: 'https://flagcdn.com/w40/kw.png'
  },
  {
    label: 'Kyrgyzstan',
    value: 'KG',
    flag: 'https://flagcdn.com/w40/kg.png'
  },
  {
    label: 'Laos',
    value: 'LA',
    flag: 'https://flagcdn.com/w40/la.png'
  },
  {
    label: 'Latvia',
    value: 'LV',
    flag: 'https://flagcdn.com/w40/lv.png'
  },
  {
    label: 'Lebanon',
    value: 'LB',
    flag: 'https://flagcdn.com/w40/lb.png'
  },
  {
    label: 'Lesotho',
    value: 'LS',
    flag: 'https://flagcdn.com/w40/ls.png'
  },
  {
    label: 'Liberia',
    value: 'LR',
    flag: 'https://flagcdn.com/w40/lr.png'
  },
  {
    label: 'Libya',
    value: 'LY',
    flag: 'https://flagcdn.com/w40/ly.png'
  },
  {
    label: 'Liechtenstein',
    value: 'LI',
    flag: 'https://flagcdn.com/w40/li.png'
  },
  {
    label: 'Lithuania',
    value: 'LT',
    flag: 'https://flagcdn.com/w40/lt.png'
  },
  {
    label: 'Luxembourg',
    value: 'LU',
    flag: 'https://flagcdn.com/w40/lu.png'
  },
  {
    label: 'Madagascar',
    value: 'MG',
    flag: 'https://flagcdn.com/w40/mg.png'
  },
  {
    label: 'Malawi',
    value: 'MW',
    flag: 'https://flagcdn.com/w40/mw.png'
  },
  {
    label: 'Malaysia',
    value: 'MY',
    flag: 'https://flagcdn.com/w40/my.png'
  },
  {
    label: 'Maldives',
    value: 'MV',
    flag: 'https://flagcdn.com/w40/mv.png'
  },
  {
    label: 'Mali',
    value: 'ML',
    flag: 'https://flagcdn.com/w40/ml.png'
  },
  {
    label: 'Malta',
    value: 'MT',
    flag: 'https://flagcdn.com/w40/mt.png'
  },
  {
    label: 'Marshall Islands',
    value: 'MH',
    flag: 'https://flagcdn.com/w40/mh.png'
  },
  {
    label: 'Mauritania',
    value: 'MR',
    flag: 'https://flagcdn.com/w40/mr.png'
  },
  {
    label: 'Mauritius',
    value: 'MU',
    flag: 'https://flagcdn.com/w40/mu.png'
  },
  {
    label: 'Mexico',
    value: 'MX',
    flag: 'https://flagcdn.com/w40/mx.png'
  },
  {
    label: 'Micronesia',
    value: 'FM',
    flag: 'https://flagcdn.com/w40/fm.png'
  },
  {
    label: 'Moldova',
    value: 'MD',
    flag: 'https://flagcdn.com/w40/md.png'
  },
  {
    label: 'Monaco',
    value: 'MC',
    flag: 'https://flagcdn.com/w40/mc.png'
  },
  {
    label: 'Mongolia',
    value: 'MN',
    flag: 'https://flagcdn.com/w40/mn.png'
  },
  {
    label: 'Montenegro',
    value: 'ME',
    flag: 'https://flagcdn.com/w40/me.png'
  },
  {
    label: 'Morocco',
    value: 'MA',
    flag: 'https://flagcdn.com/w40/ma.png'
  },
  {
    label: 'Mozambique',
    value: 'MZ',
    flag: 'https://flagcdn.com/w40/mz.png'
  },
  {
    label: 'Myanmar',
    value: 'MM',
    flag: 'https://flagcdn.com/w40/mm.png'
  },
  {
    label: 'Namibia',
    value: 'NA',
    flag: 'https://flagcdn.com/w40/na.png'
  },
  {
    label: 'Nauru',
    value: 'NR',
    flag: 'https://flagcdn.com/w40/nr.png'
  },
  {
    label: 'Nepal',
    value: 'NP',
    flag: 'https://flagcdn.com/w40/np.png'
  },
  {
    label: 'Netherlands',
    value: 'NL',
    flag: 'https://flagcdn.com/w40/nl.png'
  },
  {
    label: 'New Zealand',
    value: 'NZ',
    flag: 'https://flagcdn.com/w40/nz.png'
  },
  {
    label: 'Nicaragua',
    value: 'NI',
    flag: 'https://flagcdn.com/w40/ni.png'
  },
  {
    label: 'Niger',
    value: 'NE',
    flag: 'https://flagcdn.com/w40/ne.png'
  },
  {
    label: 'Nigeria',
    value: 'NG',
    flag: 'https://flagcdn.com/w40/ng.png'
  },
  {
    label: 'North Korea',
    value: 'KP',
    flag: 'https://flagcdn.com/w40/kp.png'
  },
  {
    label: 'North Macedonia',
    value: 'MK',
    flag: 'https://flagcdn.com/w40/mk.png'
  },
  {
    label: 'Norway',
    value: 'NO',
    flag: 'https://flagcdn.com/w40/no.png'
  },
  {
    label: 'Oman',
    value: 'OM',
    flag: 'https://flagcdn.com/w40/om.png'
  },
  {
    label: 'Pakistan',
    value: 'PK',
    flag: 'https://flagcdn.com/w40/pk.png'
  },
  {
    label: 'Palau',
    value: 'PW',
    flag: 'https://flagcdn.com/w40/pw.png'
  },
  {
    label: 'Palestine',
    value: 'PS',
    flag: 'https://flagcdn.com/w40/ps.png'
  },
  {
    label: 'Panama',
    value: 'PA',
    flag: 'https://flagcdn.com/w40/pa.png'
  },
  {
    label: 'Papua New Guinea',
    value: 'PG',
    flag: 'https://flagcdn.com/w40/pg.png'
  },
  {
    label: 'Paraguay',
    value: 'PY',
    flag: 'https://flagcdn.com/w40/py.png'
  },
  {
    label: 'Peru',
    value: 'PE',
    flag: 'https://flagcdn.com/w40/pe.png'
  },
  {
    label: 'Philippines',
    value: 'PH',
    flag: 'https://flagcdn.com/w40/ph.png'
  },
  {
    label: 'Poland',
    value: 'PL',
    flag: 'https://flagcdn.com/w40/pl.png'
  },
  {
    label: 'Portugal',
    value: 'PT',
    flag: 'https://flagcdn.com/w40/pt.png'
  },
  {
    label: 'Qatar',
    value: 'QA',
    flag: 'https://flagcdn.com/w40/qa.png'
  },
  {
    label: 'Romania',
    value: 'RO',
    flag: 'https://flagcdn.com/w40/ro.png'
  },
  {
    label: 'Russia',
    value: 'RU',
    flag: 'https://flagcdn.com/w40/ru.png'
  },
  {
    label: 'Rwanda',
    value: 'RW',
    flag: 'https://flagcdn.com/w40/rw.png'
  },
  {
    label: 'Saint Kitts and Nevis',
    value: 'KN',
    flag: 'https://flagcdn.com/w40/kn.png'
  },
  {
    label: 'Saint Lucia',
    value: 'LC',
    flag: 'https://flagcdn.com/w40/lc.png'
  },
  {
    label: 'Saint Vincent and the Grenadines',
    value: 'VC',
    flag: 'https://flagcdn.com/w40/vc.png'
  },
  {
    label: 'Samoa',
    value: 'WS',
    flag: 'https://flagcdn.com/w40/ws.png'
  },
  {
    label: 'San Marino',
    value: 'SM',
    flag: 'https://flagcdn.com/w40/sm.png'
  },
  {
    label: 'Sao Tome and Principe',
    value: 'ST',
    flag: 'https://flagcdn.com/w40/st.png'
  },
  {
    label: 'Saudi Arabia',
    value: 'SA',
    flag: 'https://flagcdn.com/w40/sa.png'
  },
  {
    label: 'Senegal',
    value: 'SN',
    flag: 'https://flagcdn.com/w40/sn.png'
  },
  {
    label: 'Serbia',
    value: 'RS',
    flag: 'https://flagcdn.com/w40/rs.png'
  },
  {
    label: 'Seychelles',
    value: 'SC',
    flag: 'https://flagcdn.com/w40/sc.png'
  },
  {
    label: 'Sierra Leone',
    value: 'SL',
    flag: 'https://flagcdn.com/w40/sl.png'
  },
  {
    label: 'Singapore',
    value: 'SG',
    flag: 'https://flagcdn.com/w40/sg.png'
  },
  {
    label: 'Slovakia',
    value: 'SK',
    flag: 'https://flagcdn.com/w40/sk.png'
  },
  {
    label: 'Slovenia',
    value: 'SI',
    flag: 'https://flagcdn.com/w40/si.png'
  },
  {
    label: 'Solomon Islands',
    value: 'SB',
    flag: 'https://flagcdn.com/w40/sb.png'
  },
  {
    label: 'Somalia',
    value: 'SO',
    flag: 'https://flagcdn.com/w40/so.png'
  },
  {
    label: 'South Africa',
    value: 'ZA',
    flag: 'https://flagcdn.com/w40/za.png'
  },
  {
    label: 'South Korea',
    value: 'KR',
    flag: 'https://flagcdn.com/w40/kr.png'
  },
  {
    label: 'South Sudan',
    value: 'SS',
    flag: 'https://flagcdn.com/w40/ss.png'
  },
  {
    label: 'Spain',
    value: 'ES',
    flag: 'https://flagcdn.com/w40/es.png'
  },
  {
    label: 'Sri Lanka',
    value: 'LK',
    flag: 'https://flagcdn.com/w40/lk.png'
  },
  {
    label: 'Sudan',
    value: 'SD',
    flag: 'https://flagcdn.com/w40/sd.png'
  },
  {
    label: 'Suriname',
    value: 'SR',
    flag: 'https://flagcdn.com/w40/sr.png'
  },
  {
    label: 'Sweden',
    value: 'SE',
    flag: 'https://flagcdn.com/w40/se.png'
  },
  {
    label: 'Switzerland',
    value: 'CH',
    flag: 'https://flagcdn.com/w40/ch.png'
  },
  {
    label: 'Syria',
    value: 'SY',
    flag: 'https://flagcdn.com/w40/sy.png'
  },
  {
    label: 'Taiwan',
    value: 'TW',
    flag: 'https://flagcdn.com/w40/tw.png'
  },
  {
    label: 'Tajikistan',
    value: 'TJ',
    flag: 'https://flagcdn.com/w40/tj.png'
  },
  {
    label: 'Tanzania',
    value: 'TZ',
    flag: 'https://flagcdn.com/w40/tz.png'
  },
  {
    label: 'Thailand',
    value: 'TH',
    flag: 'https://flagcdn.com/w40/th.png'
  },
  {
    label: 'Timor-Leste',
    value: 'TL',
    flag: 'https://flagcdn.com/w40/tl.png'
  },
  {
    label: 'Togo',
    value: 'TG',
    flag: 'https://flagcdn.com/w40/tg.png'
  },
  {
    label: 'Tonga',
    value: 'TO',
    flag: 'https://flagcdn.com/w40/to.png'
  },
  {
    label: 'Trinidad and Tobago',
    value: 'TT',
    flag: 'https://flagcdn.com/w40/tt.png'
  },
  {
    label: 'Tunisia',
    value: 'TN',
    flag: 'https://flagcdn.com/w40/tn.png'
  },
  {
    label: 'Turkey',
    value: 'TR',
    flag: 'https://flagcdn.com/w40/tr.png'
  },
  {
    label: 'Turkmenistan',
    value: 'TM',
    flag: 'https://flagcdn.com/w40/tm.png'
  },
  {
    label: 'Tuvalu',
    value: 'TV',
    flag: 'https://flagcdn.com/w40/tv.png'
  },
  {
    label: 'Uganda',
    value: 'UG',
    flag: 'https://flagcdn.com/w40/ug.png'
  },
  {
    label: 'Ukraine',
    value: 'UA',
    flag: 'https://flagcdn.com/w40/ua.png'
  },
  {
    label: 'United Arab Emirates',
    value: 'AE',
    flag: 'https://flagcdn.com/w40/ae.png'
  },
  {
    label: 'United Kingdom',
    value: 'GB',
    flag: 'https://flagcdn.com/w40/gb.png'
  },
  {
    label: 'United States',
    value: 'US',
    flag: 'https://flagcdn.com/w40/gb.png'
  },
  {
    label: 'Uruguay',
    value: 'UY',
    flag: 'https://flagcdn.com/w40/uy.png'
  },
  {
    label: 'Uzbekistan',
    value: 'UZ',
    flag: 'https://flagcdn.com/w40/uz.png'
  },
  {
    label: 'Vanuatu',
    value: 'VU',
    flag: 'https://flagcdn.com/w40/vu.png'
  },
  {
    label: 'Vatican City',
    value: 'VA',
    flag: 'https://flagcdn.com/w40/va.png'
  },
  {
    label: 'Venezuela',
    value: 'VE',
    flag: 'https://flagcdn.com/w40/ve.png'
  },
  {
    label: 'Vietnam',
    value: 'VN',
    flag: 'https://flagcdn.com/w40/vn.png'
  },
  {
    label: 'Yemen',
    value: 'YE',
    flag: 'https://flagcdn.com/w40/ye.png'
  },
  {
    label: 'Zambia',
    value: 'ZM',
    flag: 'https://flagcdn.com/w40/zm.png'
  },
  {
    label: 'Zimbabwe',
    value: 'ZW',
    flag: 'https://flagcdn.com/w40/zw.png'
  }
]

// Type definition for a country
export type Country = {
  label: string
  value: string
  flag: string
}

export const YourLootSupportBotLink = 'https://t.me/YourLoot_SupportBot'
