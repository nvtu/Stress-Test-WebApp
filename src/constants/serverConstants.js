export const SERVER_URL = 'http://localhost:8001'

export const API_STEST = `${SERVER_URL}/stest`
export const API_TEST_SESSION_LOGGING = `${API_STEST}/test-session-logging`
export const API_GENERATE_STEST_WITH_LEVEL = `${API_STEST}/generate-stest-with-level`
export const API_VALIDATE_ANSWER = `${API_STEST}/validate-answer`

export const API_SCOREBOARD = `${SERVER_URL}/scoreboard`
export const API_GET_SCOREBOARD = `${API_SCOREBOARD}/retrieve-scoreboard`

export const API_READING_TEST = `${SERVER_URL}/reading_test`
export const API_GENERATE_READING_TESTS = `${API_READING_TEST}/generate-reading-tests`
export const API_READING_TEST_SESSION_LOGGING = `${API_READING_TEST}/test-session-logging`
export const API_GET_READING_TEST = `${API_READING_TEST}/get-reading-test`
export const API_UPDATE_READING_TEST_SCORE = `${API_READING_TEST}/update-reading-test-score`