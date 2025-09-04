const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('calcularMediaAluno deve estar definida', () => {
    expect(calcularMediaAluno).toBeDefined();
  });
  
  test('lança se a1 ou a2 forem negativas', () => {
    expect(() => calcularMediaAluno(-1, 0)).toThrow();
    expect(() => calcularMediaAluno(0, -2)).toThrow();
  });

  test('calcula média base quando a3 não é informada', () => {
    const media = calcularMediaAluno(5, 8);
    expect(media).toBeCloseTo(5 * 0.4 + 8 * 0.6, 5); 
  });
  
  test('lança se a3 for negativa', () => {
    expect(() => calcularMediaAluno(6, 0, -1)).toThrow();
  });
  
  test('com a3 informada, melhor combinação é a1 com a3', () => {
    const media = calcularMediaAluno(9, 5, 10);
    expect(media).toBeCloseTo(9 * 0.4 + 10 * 0.6, 5);
  });

  test('com a3 informada, melhor combinação é a3 com a2', () => {
    const media = calcularMediaAluno(2, 9, 10);
    expect(media).toBeCloseTo(10 * 0.4 + 9 * 0.6, 5);
  });
  