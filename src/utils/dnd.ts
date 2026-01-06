export function calculateModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(modifier: number): string {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

export function calculateProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2;
}

export function generateSessionCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function parseDiceExpression(expression: string): { count: number; sides: number; modifier: number } | null {
  const match = expression.match(/^(\d+)?d(\d+)([+-]\d+)?$/i);
  if (!match) return null;

  return {
    count: parseInt(match[1] || '1'),
    sides: parseInt(match[2]),
    modifier: parseInt(match[3] || '0')
  };
}

export function rollDiceExpression(expression: string): { result: number; breakdown: number[]; expression: string } | null {
  const parsed = parseDiceExpression(expression);
  if (!parsed) return null;

  const breakdown: number[] = [];
  for (let i = 0; i < parsed.count; i++) {
    breakdown.push(rollDice(parsed.sides));
  }

  const total = breakdown.reduce((sum, val) => sum + val, 0) + parsed.modifier;

  return {
    result: total,
    breakdown,
    expression
  };
}
