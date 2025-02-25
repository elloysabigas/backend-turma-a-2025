const PaymentController = {

    async createPayment(req, res){
        try {
            res.status(201).json({ message: 'Payment created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
 
    async updatePayment(req, res){
        try {
            res.status(200).json({ message: 'Payment updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
 
    async deletePayment(req, res){
        try {
            res.status(200).json({ message: 'Payment deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
 
    async getPayment(req, res){
        try {
            res.status(200).json({ message: 'Payment retrieved successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
 }
 
 export default PaymentController;
 