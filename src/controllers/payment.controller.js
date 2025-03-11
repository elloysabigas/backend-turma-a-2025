import { z } from "zod";


const PaymentSchema = z.object({
    data: z.string().datetime({ offset: true }).or(z.date()).refine(
        (val) => !isNaN(Date.parse(val)), 
        { message: "Data inválida" }
    ),
    numerorecibo: z.string().min(1, { message: "Número do recibo é obrigatório" }),
    usuarioioId: z.string().regex(/^\d+$/, { message: "ID do usuário deve ser numérico" }),
    valor: z.string().regex(/^\d+(\.\d{2})?$/, { message: "Valor deve estar no formato correto (ex: 12.34)" }),
    observacao: z.string().max(100, { message: "A observação deve ter no máximo 100 caracteres" }),
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
    }
}

export default PaymentController;
