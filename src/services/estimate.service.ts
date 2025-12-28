import { EstimateCostRequest } from "../models/request/estimate.request";
import { createEstimateHistoryRepo } from "../repositories/estimate-history.repository";
import vendorRepository from "../repositories/vendor.respository";


const estimateCost = async (estimateCostRequest: EstimateCostRequest) => {
    try {
        const { userId, items, totalEstimate } = estimateCostRequest;

        if (totalEstimate < 0 || items.length === 0) {
            throw new Error('Total estimate cannot be negative');
        }

        const vendorIds = items.map(item => item.vendorId);

        const vendorsData = await vendorRepository.getVendorsByIds(vendorIds);


        for (const item of items) {
            const vendor = vendorsData.find(v => v._id.toString() === item.vendorId) ?? null;
            
            if (!vendor) {
                throw new Error(`Vendor with ID ${item.vendorId} not found`);
            }

            const itemDetails = {
                itemId: item.itemId,
                quantity: item.quantity,
                vendorId: item.vendorId,
                vendorName: vendor.name,
            }

            Object.assign(item, itemDetails);
        }

        await createEstimateHistoryRepo({
            userId,
            items,
            totalEstimate
        });

        return { success: true, message: 'Estimate cost calculated and saved successfully' };
    } catch (error: any) {
        console.error('Error estimating cost:', {
            message: error.message,
            stack: error.stack,
        });
        throw error;
    }
}