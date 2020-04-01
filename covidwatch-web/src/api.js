import CovidWatch from 'covidwatch-js'
import {
  safetyPeriod,
  estimatedDiagnosisDelay,
  serverBaseUrl as defaultServerBaseUrl
} from 'covidwatch-js/config'

const checkpointsDBKey = 'CHECKPOINTS'
const useConfirmedDBKey = 'USECONFIRMED'
const serverBaseUrl = process.env['REACT_APP_SERVER_BASE_URL'] || defaultServerBaseUrl

function getCheckpoints () {
  const localStorage = window.localStorage
  const checkpointsString = localStorage.getItem(checkpointsDBKey) || '[]'
  return Promise.resolve(JSON.parse(checkpointsString))
}

function setCheckpoints (checkpointsArr) {
  const localStorage = window.localStorage
  return Promise.resolve(localStorage.setItem(checkpointsDBKey, JSON.stringify(checkpointsArr)))
}

async function getUseConfirmed () {
  const localStorage = window.localStorage
  const useConfirmedString = localStorage.getItem(useConfirmedDBKey) || 'false'
  return Promise.resolve(JSON.parse(useConfirmedString))
}

async function setUseConfirmed (newVal) {
  const localStorage = window.localStorage
  return Promise.resolve(localStorage.setItem(useConfirmedDBKey, JSON.stringify(newVal)))
}

const covidWatch = CovidWatch({
  serverBaseUrl,
  safetyPeriod,
  estimatedDiagnosisDelay,
  getCheckpoints,
  setCheckpoints,
  getUseConfirmed,
  setUseConfirmed
})

const {
  hostCheckpoint,
  joinCheckpoint,
  getExposureStatus,
  reportPositive
} = covidWatch

export default {
  hostCheckpoint,
  joinCheckpoint,
  getExposureStatus,
  reportPositive,
  getUseConfirmed,
  setUseConfirmed
}
