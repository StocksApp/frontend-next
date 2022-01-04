import ARIMA from 'arima';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { inputData, length } = JSON.parse(req.body);
  const autoarima = new ARIMA({ auto: true }).fit(inputData);
  const [pred] = autoarima.predict(length);
  const roundedPred = pred.map((p) => p.toFixed(3));
  res.status(200).json({ pred: roundedPred });
}
