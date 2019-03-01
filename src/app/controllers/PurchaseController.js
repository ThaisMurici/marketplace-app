const Ad = require('../models/Ad')
const User = require('../models/User')
const Mail = require('../services/Mail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchasedAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    await Mail.sendMail({
      from: '"Thais Moraes" <murici.thais@gmail.com>',
      to: purchasedAd.author.email,
      subject: `Solicitação de compra: ${purchasedAd.title}`,
      template: 'purchase',
      context: { user, content, ad: purchasedAd }
    })

    return res.send()
  }
}

module.exports = new PurchaseController()
