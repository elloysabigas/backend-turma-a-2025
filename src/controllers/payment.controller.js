import { z } from "zod";


const PaymentSchema = z.object({
   data: z.string().datetime(),
   valor: z.number().positive(),
   numero: z.number().int().positive(),
   observacao: z.string().optional()
});

const PaymentController = {
    async createPayment(req, res) {
        try {
            const { data, numerorecibo, usuarioioId, valor, observacao } = req.body;

            PaymentSchema.parse({ data, numerorecibo, usuarioioId, valor, observacao });

            console.log({ data, numerorecibo, usuarioioId, valor, observacao });

            res.status(201).json({ message: "Pagamento criado com sucesso" });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors.map(err => ({
                        atributo: err.path[0],
                        message: err.message,
                    })),
                });
            }
            res.status(500).json({ message: error.message });
        }
    },

    async updatePayment (req, res){
       try {
        const {id} = req.params;
        const { valor, numero, data, observacao} = req.body;
        PaymentSchema.parse({valor, numero, data, observacao});
        res.status(200).json({message: 'Payment update successfully',
           data: {id, valor, numero, data, observacao} });
       } catch (error) {
        if(error instanceof z.ZodError){
            res.status(400).json({message: 'validation error',
                details: error, errors });
        }
        res.status(500).json({ message: error.message});
       }
       
},
    async deletePayment(req, res){
         try {
        const {id} = req.params
        return res.status(200).json({message: 'Payment deleted', id});
    } catch (error) {
        return res.status(500).json({message: 'Internal server erroe'});
    }
    },
}

export default PaymentController;
