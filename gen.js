import faker from 'faker'
import format from 'date-format'
import json2csv from 'json2csv'
import fs from 'fs'

const NUM_TO_GENERATE = 1000000
const DOMAIN = 'email.com'

let city = faker.fake('{{address.city}}')
let state = faker.fake('{{address.state}}')
let school = faker.fake('{{commerce.productMaterial}} {{address.county}} High School')

const pickOne = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

let gen = () => {
  let firstName = faker.fake('{{name.firstName}}')
  let lastName = faker.fake('{{name.lastName}}')
  let postalCode = faker.fake('{{address.zipCode}}')
  let email = faker.fake(`${firstName}${lastName}${[postalCode]}@${DOMAIN}`)
  let phone = faker.fake('{{phone.phoneNumberFormat(0)}}')
  let gender = faker.fake(pickOne(['Male', 'Female']))
  let address = faker.fake('{{address.streetAddress}}')
  let graduationYear = faker.fake(pickOne(['2017', '2018', '2019', '2020']))
  let birthDate = format('MM/dd/yy', faker.date.between('1995-01-01', '2000-12-31'))
  let emergencyContactFirstName = faker.fake('{{name.firstName}}')
  let emergencyContactLastName = lastName
  let emergencyContactPhone = phone
  let emergencyContactRelationship = pickOne(['Parent', 'Legal Guardian'])

  return {
    firstName: firstName,
    lastName: lastName,
    postalCode: postalCode,
    email: email,
    phone: phone,
    gender: gender,
    address: address,
    city: city,
    state: state,
    school: school,
    graduationYear: graduationYear,
    birthDate: birthDate,
    emergencyContactFirstName: emergencyContactFirstName,
    emergencyContactLastName: emergencyContactLastName,
    emergencyContactPhone: emergencyContactPhone,
    emergencyContactRelationship: emergencyContactRelationship
  }
}

let entries = Array(NUM_TO_GENERATE).fill().map((_, i) => gen())

let headers = [ 'firstName', 'lastName', 'postalCode', 'email', 'phone', 'gender',
  'address', 'city', 'state', 'school', 'graduationYear', 'birthDate', 'emergencyContactFirstName',
  'emergencyContactLastName', 'emergencyContactPhone', 'emergencyContactRelationship' ]

let output = json2csv({ data: entries, fields: headers })

fs.writeFile('output.csv', output, function (err) {
  if (err) throw err
  console.log('File saved!')
})
