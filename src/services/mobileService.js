import Mobile from '../models/Mobile.js';

export default {
    async createMobile(data) {
        try {
            const mobile = new Mobile(data);
            await mobile.save();
            return mobile;
        } catch (error) {
            throw new Error('Error creating mobile: ' + error.message);
        }
    },

    async getMobileById(id) {
        try {
            const mobile = await Mobile.findById(id);
            if (!mobile) {
                throw new Error('Mobile not found');
            }
            return mobile;
        } catch (error) {
            throw new Error('Error fetching mobile: ' + error.message);
        }
    },

    async updateMobile(id, data) {
        try {
            const mobile = await Mobile.findByIdAndUpdate(id, data, { new: true });
            if (!mobile) {
                throw new Error('Mobile not found');
            }
            return mobile;
        } catch (error) {
            throw new Error('Error updating mobile: ' + error.message);
        }
    },

    async deleteMobile(id) {
        try {
            const mobile = await Mobile.findByIdAndDelete(id);
            if (!mobile) {
                throw new Error('Mobile not found');
            }
            return mobile;
        } catch (error) {
            throw new Error('Error deleting mobile: ' + error.message);
        }
    },

    async getAllMobiles() {
        try {
            const mobiles = await Mobile.find();
            return mobiles;
        } catch (error) {
            throw new Error('Error fetching mobiles: ' + error.message);
        }
    }
}
