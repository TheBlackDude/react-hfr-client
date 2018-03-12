import mockLocalStorage from 'mock-local-storage'
global.window = { localStorage: mockLocalStorage }
