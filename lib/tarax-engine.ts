/**
 * ============================================================================
 * TARAX AI — Autonomous B2B Global Trade & Multi-Agent Negotiation Engine
 * Powered by Google Gemini (100% Free Tier Supported)
 * ============================================================================
 * @module TaraxAIEngine
 * @version 1.1.0
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface SupplierProfile {
  id: string;
  companyName: string;
  country: string;
  verifiedCertifications: string[];
  productCatalog: {
    sku: string;
    name: string;
    basePriceUSD: number;
    moq: number;
    monthlyCapacity: number;
  }[];
  complianceScore: number;
}

export interface BuyerRFQ {
  rfqId: string;
  buyerCompany: string;
  targetProduct: string;
  requiredQuantity: number;
  targetUnitPriceUSD: number;
  destinationPort: string;
  mandatoryCertifications: string[];
}

export interface EscrowMilestone {
  phaseName: string;
  percentageAllocation: number;
  releaseTrigger: string;
}

export interface ExecutedTradeContract {
  contractId: string;
  timestamp: string;
  buyer: string;
  supplier: string;
  product: string;
  finalQuantity: number;
  negotiatedUnitPriceUSD: number;
  totalContractValueUSD: number;
  incoterm: 'FOB' | 'CIF' | 'DDP' | 'EXW';
  complianceStatus: 'VERIFIED' | 'ACTION_REQUIRED';
  escrowStructure: EscrowMilestone[];
  riskScore: number;
  aiNegotiationSummary: string;
}

class TaraxDigitalMemory {
  private suppliers: Map<string, SupplierProfile> = new Map();
  private contracts: Map<string, ExecutedTradeContract> = new Map();

  constructor() {
    this.seedMemory();
  }

  private seedMemory(): void {
    const defaultSupplier: SupplierProfile = {
      id: 'sup_global_001',
      companyName: 'Shenzhen Precision Robotics & Tech Co., Ltd.',
      country: 'China',
      verifiedCertifications: ['ISO9001', 'CE', 'RoHS', 'FDA'],
      productCatalog: [
        {
          sku: 'ROBOT-ARM-V2',
          name: 'Autonomous Industrial Robotic Arm',
          basePriceUSD: 12000,
          moq: 10,
          monthlyCapacity: 500,
        },
      ],
      complianceScore: 98,
    };
    this.suppliers.set(defaultSupplier.id, defaultSupplier);
  }

  public getAllSuppliers(): SupplierProfile[] {
    return Array.from(this.suppliers.values());
  }

  public registerContract(contract: ExecutedTradeContract): void {
    this.contracts.set(contract.contractId, contract);
  }

  public getContract(contractId: string): ExecutedTradeContract | undefined {
    return this.contracts.get(contractId);
  }
}

export const taraxMemory = new TaraxDigitalMemory();

export class TaraxTradeEngine {
  public async executeAutonomousTrade(rfq: BuyerRFQ): Promise<ExecutedTradeContract> {
    const suppliers = taraxMemory.getAllSuppliers();

    const prompt = `
      You are TARAX AI — the world's leading autonomous B2B Global Trade Engine.
      You execute negotiations between Buyers and Global Manufacturers instantly.

      MULTIPLE AGENT ROLES RUNNING IN PARALLEL:
      1. [Negotiator Agent]: Bargain target price ($${rfq.targetUnitPriceUSD}) against bulk volume (${rfq.requiredQuantity} units).
      2. [Compliance Agent]: Enforce required certifications: ${rfq.mandatoryCertifications.join(', ')}.
      3. [Logistics Agent]: Establish optimal Incoterms (CIF, DDP, or FOB) to ${rfq.destinationPort}.
      4. [Finance Agent]: Build milestone-based Smart Escrow payment structures.

      BUYER RFQ INPUT:
      ${JSON.stringify(rfq, null, 2)}

      AVAILABLE GLOBAL SUPPLIERS:
      ${JSON.stringify(suppliers, null, 2)}

      TASK:
      Execute autonomous contract output strictly in valid JSON using this format:
      {
        "supplierId": "string",
        "supplierCompanyName": "string",
        "negotiatedUnitPriceUSD": number,
        "incoterm": "CIF",
        "complianceStatus": "VERIFIED",
        "riskScore": 2,
        "aiNegotiationSummary": "string",
        "escrowStructure": [
          { "phaseName": "Deposit", "percentageAllocation": 30, "releaseTrigger": "Contract Signing" },
          { "phaseName": "Quality Passed", "percentageAllocation": 40, "releaseTrigger": "Third-Party ISO Audit" },
          { "phaseName": "Final Delivery", "percentageAllocation": 30, "releaseTrigger": "Bill of Lading Verification" }
        ]
      }
      Return ONLY raw valid JSON, no markdown formatting.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().replace(/```json|```/g, '').trim();

    const parsedResult = JSON.parse(responseText || '{}');

    const contract: ExecutedTradeContract = {
      contractId: `TARAX-CONTRACT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      buyer: rfq.buyerCompany,
      supplier: parsedResult.supplierCompanyName || 'TARAX Verified Factory',
      product: rfq.targetProduct,
      finalQuantity: rfq.requiredQuantity,
      negotiatedUnitPriceUSD: parsedResult.negotiatedUnitPriceUSD || rfq.targetUnitPriceUSD,
      totalContractValueUSD: (parsedResult.negotiatedUnitPriceUSD || rfq.targetUnitPriceUSD) * rfq.requiredQuantity,
      incoterm: parsedResult.incoterm || 'CIF',
      complianceStatus: parsedResult.complianceStatus || 'VERIFIED',
      escrowStructure: parsedResult.escrowStructure || [],
      riskScore: parsedResult.riskScore || 2,
      aiNegotiationSummary: parsedResult.aiNegotiationSummary || 'Automated execution successfully completed by TARAX AI powered by Gemini.',
    };

    taraxMemory.registerContract(contract);

    return contract;
  }
}
