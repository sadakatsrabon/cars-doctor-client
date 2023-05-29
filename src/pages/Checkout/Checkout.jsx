import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";


const Checkout = () => {

    const service = useLoaderData();
    const { _id, title, price, img } = service;
    const { user } = useContext(AuthContext)

    const handleCheckout = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const dueAm = form.due.value;
        const checkout = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price,
            dueAm,
        }

        console.log(checkout);

        // Add error handling here

        fetch('http://localhost:5100/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(checkout),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })

    }
    return (
        <div>
            <h2 className="text-center text-3xl font-bold">Checkout : {title} </h2>
            <div className="card-body">
                <form onSubmit={handleCheckout}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"></span>
                            </label>
                            <input type="text" name="name" defaultValue={user?.displayName} placeholder="Name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"></span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" />
                        </div>

                        {/* 2nd section */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"></span>
                            </label>
                            <input type="email" name="email" defaultValue={user?.email} placeholder="Your E-Mail" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"></span>
                            </label>
                            <input type="text" name="due" defaultValue={'Due Amout - $ ' + price} className="input input-bordered" />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
