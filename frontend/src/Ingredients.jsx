import { useState, useEffect } from "react"

const API_URL = "https://efficient-warmth-production-3ad5.up.railway.app/ingredients"

function Ingredients({ token }) {
  const [ingredients, setIngredients] = useState([])
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("جرام")
  const [stock, setStock] = useState("")

  function loadIngredients() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setIngredients(data))
  }

  useEffect(() => {
    loadIngredients()
  }, [])

  function addIngredient() {
  fetch(API_URL, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, unit, stock: Number(stock) })
  })
    .then(res => res.json())
    .then(() => {
      setName("")
      setStock("")
      loadIngredients()
    })
}

  function deleteIngredient(id) {
  fetch(`${API_URL}/${id}`, { 
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(() => loadIngredients())
}

  return (
    <div className="ingredients-page">
      <h2>مخزون المواد الخام</h2>

      <div className="ingredient-form">
        <input placeholder="اسم المادة" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="الكمية بالجرام" value={stock} onChange={(e) => setStock(e.target.value)} />
        <button onClick={addIngredient}>إضافة</button>
      </div>

      {ingredients.map(item => (
        <div className="ingredient-row" key={item.id}>
          <span>{item.name}</span>
          <span>{item.stock} {item.unit}</span>
          <button className="rmv-btn" onClick={() => deleteIngredient(item.id)}>حذف</button>
        </div>
      ))}
    </div>
  )
}

export default Ingredients