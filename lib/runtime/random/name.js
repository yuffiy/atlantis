// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random name
 */

import { randomNumber } from './core'


type Sex = 'm' | 'f'
type Language = 'zh' | 'en'
type Names = string[]
type NameList = [ string[], string[] ]
type FullName = {
  firstName: string,
  lastName:  string
}
type makeNameList = (sex: Sex) => NameList
type NameOptions = {
  sex: Sex,
  lang: Language,
  space: boolean,
  last: boolean,
  format: (fullname: FullName, options: NameOptions) => string
}

const English_Firstnames: Names = ["Fay", "Ward", "Aurora", "Celsa", "Sharilyn", "Shyla", "Maximo", "Dillon", "Elton", "Gerard", "Kristie", "Windy", "Vickey", "Dylan", "June", "Phil", "Napoleon", "Tula", "Dalia", "Jerrold", "Neva", "Toya", "Iris", "Hanna", "Porfirio", "Garrett", "Fred", "Earlean", "Carmon", "Vincenza", "Maurine", "Alysia", "Ginny", "Giuseppe", "Mark", "Lucilla", "Ashley", "Loreta", "Sueann", "Paulita", "Aurelia", "Adelina", "Akiko", "Carmelo", "Rufina", "Ashli", "Brant", "Giovanni", "Deidre", "Tonda"]

const English_Male_Lastnames: Names = ["Jacob", "Michael", "Joshua", "Matthew", "Ethan", "Andrew", "Daniel", "Anthony", "Christopher", "Joseph", "William", "Alexander", "Ryan", "David", "Nicholas", "Tyler", "James", "John", "Jonathan", "Nathan", "Samuel", "Christian", "Noah", "Dylan", "Benjamin", "Logan", "Brandon", "Gabriel", "Zachary", "Jose", "Elijah", "Angel", "Kevin", "Jack", "Caleb", "Justin", "Austin", "Evan", "Robert", "Thomas", "Luke", "Mason", "Aidan", "Jackson", "Isaiah", "Jordan", "Gavin", "Connor", "Aiden", "Isaac"]

const English_Fmale_Lastnames: Names = ["Emily", "Emma", "Madison", "Abigail", "Olivia", "Isabella", "Hannah", "Samantha", "Ava", "Ashley", "Sophia", "Elizabeth", "Alexis", "Grace", "Sarah", "Alyssa", "Mia", "Natalie", "Chloe", "Brianna", "Lauren", "Ella", "Anna", "Taylor", "Kayla", "Hailey", "Jessica", "Victoria", "Jasmine", "Sydney", "Julia", "Destiny", "Morgan", "Kaitlyn", "Savannah", "Katherine", "Alexandra", "Rachel", "Lily", "Megan", "Kaylee", "Jennifer", "Angelina", "Makayla", "Allison", "Brooke", "Maria", "Trinity", "Lillian", "Mackenzie"]

const Chinese_Firstnames: Names = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦"]

const Chinese_Male_Lastnames: Names = ["恬强", "博冰", "登州", "典梅", "禾英", "璇冰", "延达", "琇群", "育俊", "力芷", "诚俊", "阳孝", "依芸", "宜欣", "易心", "火孝", "屏妃", "少屏", "恭舜", "群杰", "贵苓", "茹旺", "为奇", "泓玲", "家定", "桂雪", "恒岳", "治佩", "琳祯", "妤安", "皇祥", "新峰", "礼杰", "蓉航", "绍月", "俐凡", "思君", "鸿奇", "乐威", "坚弘", "玉欣", "又萱", "轩平", "新惟", "孟吉", "佩岳", "思春", "义吟", "桂绿", "善淳"]

const Chinese_Fmale_Lastnames: Names = ["亭乔", "竹轩", "儒裕", "友元", "忠纯", "其季", "谷欣", "祯峰", "轩玉", "富峰", "为定", "仪绮", "旭谕", "采纬", "瑶音", "吟幸", "韵秋", "和佩", "人春", "东梦", "琦娥", "海修", "正人", "皓生", "韵婷", "念龙", "瑜城", "雪琦", "淳幸", "聿志", "鸿苹", "奇凌", "燕霖", "柔康", "裕迪", "金易", "春霖", "孝育", "林岳", "羽仁", "白萍", "鑫定", "宪夫", "诚苹", "亮霖", "侑泉", "凌羽", "茂帆", "典山", "丞成"]


function makeEnNameList(sex: Sex): NameList {
  let firstnames: string[] = English_Firstnames,
      lastnames: string[]  = sex === 'm' ? English_Male_Lastnames : English_Fmale_Lastnames

  return [ firstnames, lastnames ]
}

function makeZhNameList(sex: Sex): NameList {
  let firstnames: string[] = Chinese_Firstnames,
      lastnames: string[]  = sex === 'm' ? Chinese_Male_Lastnames : Chinese_Fmale_Lastnames

  return [ firstnames, lastnames ]
}


function defaultFormat(fullName: FullName, options: NameOptions): string {
  let { space, last, lang } = options,
      { firstName, lastName } = fullName,
      isEn: boolean = lang === 'en'

  if(last) return lastName
  if(space && isEn) return firstName + ' ' + lastName
  return firstName + lastName
}


function parser(str: string): NameOptions {
  // TODO
  // name|
}

const defaultNameOptions: NameOptions = {
  sex: 'm',
  lang: 'en',
  space: true,
  last: false,
  format: defaultFormat
}

export default function name(opts?: NameOptions): string {

  let options: NameOptions = Object.assign({}, defaultNameOptions, opts),
      { sex, lang, space, last, format } = options,
      seed1: number   = randomNumber(50),
      seed2: number   = randomNumber(50),
      isEn: boolean = lang === 'en',
      makefx: makeNameList = isEn ? makeEnNameList : makeZhNameList,
      [ firstNames, lastNames ]: NameList = makefx(sex),
      firstName: string = firstNames[seed1],
      lastName: string  = lastNames[seed2],
      fullName: FullName = { firstName: firstName, lastName: lastName },
      out: string = format(fullName, options)

  return out
}


// TODO format helper
