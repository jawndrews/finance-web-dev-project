import Payment from "../models/Payment.js";
import Invoice from "../models/Invoice.js";

// payments
export const getPayments = async (req, res) => {
  try {
    // pagination
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const payments = await Payment.find({
      $in: [{ userId: { $regex: new RegExp(search, "i") } }],
    })
      .sort(sortFormatted)
      .populate("userId")
      .populate("invoiceId")
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Payment.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      payments,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message }); //update to be more specific
  }
};

export const getInvoices = async (req, res) => {
  try {
    // pagination
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const invoices = await Invoice.find({
      $or: [{ userId: { $regex: new RegExp(search, "i") } }],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Invoice.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      invoices,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message }); //update to be more specific
  }
};
