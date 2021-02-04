import firebase from 'services/firebase'

export default async (req, res) => {
  const { code } = req.query

  // UPDATE
  if (req.method === 'PUT') {
    const { origin } = req.body

    // TODO: authorization

    try {
      await firebase.firestore().collection('shortcuts').doc(code).update({
        origin: origin,
      })

      return res.status(200).json({ success: 'Shortcut updated successfully' })
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível realizar a operação.' })
    }
  }

  // DELETE
  if (req.method === 'DELETE') {
    // TODO: authorization

    try {
      await firebase.firestore().collection('shortcuts').doc(code).delete()

      return res.status(200).json({ success: 'Shortcut deleted successfully' })
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Não foi possível realizar a operação.' })
    }
  }

  // READ
  try {
    const shortcut = await firebase
      .firestore()
      .collection('shortcuts')
      .doc(code)
      .get()

    const currentShortcut = shortcut.data()

    const updatedShortcut = {
      origin: currentShortcut.origin,
      count: ++currentShortcut.count,
    }

    await firebase
      .firestore()
      .collection('shortcuts')
      .doc(code)
      .set({ ...updatedShortcut, user: currentShortcut.user })

    return res.status(200).json(updatedShortcut)
  } catch (err) {
    return res
      .status(403)
      .json({ error: 'Não foi possível realizar a operação.' })
  }
}
