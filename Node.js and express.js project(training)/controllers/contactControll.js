//@desc Get all contacts
//@route GET /api/contacts
//@access public

export const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

//@desc Create a new contact
//@route POST /api/contacts
//@access public

export const createContact = (req, res) => {
  console.log(req.body);
  const { name, email, phone} = req.body;
  if(!name || !email || !phone) {
    res.status(400);
    throw new Error(`Invalid data`)
  }
  res.status(201).json({ message: "Create Contact" });
};

//@desc Get contact
//@route GET /api/contacts:id
//@access public

export const getContact = (req, res) => {
  res.status(200).json({ message: `Get contact for ${req.params.id}` });
};

//@desc Update contact
//@route PUT /api/contacts:id
//@access public

export const updateContact = (req, res) => {
  res.status(200).json({ message: `Update contact for ${req.params.id}` });
};

//@desc Delete contact
//@route DELETE /api/contacts:id
//@access public

export const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
};
