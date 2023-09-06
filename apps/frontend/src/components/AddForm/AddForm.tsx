<<<<<<< HEAD
import React, {useState} from "react";
import {Btn} from "../../common/Btn/Btn";
import './AddForm.css'
import {geoCode} from "../../utils/geocoding";
import {AdEntity} from "types";

interface Form {
    name: string,
    description: string,
    price: number,
    url: string,
    address: string
}

export function AddForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const [id, setId] = useState("")
    const [form, setForm] = useState<Form>(
        {
            name: '',
            description: '',
            price: 0,
            url: '',
            address: ''
        }
    )

    function updateForm<T extends keyof Form>(key: T, value: Form[T]) {
        setForm({
            ...form,
            [key]: value
        })

    }

    async function sendForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        try {
            const {lon,lat} = await geoCode(form.address)
            const response = await fetch('http://localhost:3000/ad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...form,
                    lat,
                    lon
                })
            })
            const {ad} = await response.json() as {
                ad: AdEntity
            }
            setId(ad.id)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <p>
                Adding...
            </p>
        )
    }
    if(id) {
        return (
            <p>
                Added with id: {id}
            </p>
        )
    }

    return (
        <form className="add-form" onSubmit={sendForm}>
            <h1>Dodawanie ogłoszenia</h1>
            <p>
                <label>
                    Nazwa: <br/>
                    <input
                        type="text"
                        name="name"
                        required
                        maxLength={99}
                        value={form.name}
                        onChange={e => updateForm('name', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Opis: <br/>
                    <textarea
                        name="description"
                        maxLength={999}
                        value={form.description}
                        onChange={e => updateForm('description', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Cena: <br/>
                    <input
                        type="number"
                        name="price"
                        required
                        maxLength={99}
                        value={form.price}
                        onChange={e => updateForm('price', Number(e.target.value))}
                    /> <br/>
                    <small>Pozostaw zero w polu, aby nie wyświetlać ceny.</small>
                </label>
            </p>
            <p>
                <label>
                    Adres URL: <br/>
                    <input
                        type="url"
                        name="url"
                        maxLength={99}
                        value={form.url}
                        onChange={e => updateForm('url', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Adres fizyczny na mapie: <br/>
                    <input
                        type="text"
                        name="address"
                        required
                        maxLength={99}
                        value={form.address}
                        onChange={e => updateForm('address', e.target.value)}

                    />
                </label>
            </p>
            <Btn text="Zapisz"/>
        </form>
=======
import React from "react";

export function AddForm(){
    return (
        <div>
            <h1>Add Form</h1>
        </div>
>>>>>>> c753415 (fix(Backend): vercel.json again2)
    )
}