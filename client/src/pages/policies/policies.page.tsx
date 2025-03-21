import { AlertTriangle } from "lucide-react";

function PoliciesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-3xl py-2">Library Policy</h2>
      <div>
        Welcome to the Chandigarh University Library Management System (LMS).
        Our mission is to facilitate access to resources, support academic
        endeavors, and promote lifelong learning within our university
        community. To ensure a seamless and efficient library experience, please
        take a moment to familiarize yourself with the following policies:
      </div>
      <div>
        <ol className="list-decimal ml-4 flex flex-col gap-4">
          <li>
            <h3 className="font-bold">Eligibility for Library Services</h3>
            <p className="px-2">
              All students, faculty, staff, and administrators of Chandigarh
              University are eligible to avail library services. The library is
              also open to external members through specific membership
              programs.
            </p>
          </li>
          <li>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold">Library Hours of Operation</h3>
              <table className="max-w-2xl">
                <tbody>
                  <tr>
                    <th className="font-medium">Monday to Saturday</th>
                    <td className="px-2">07:00 am to 09:00 pm</td>
                  </tr>
                </tbody>
              </table>
              <p className="px-2 py-1 w-fit flex justify-center items-center bg-amber-200/40 border-2 border-amber-400 rounded-xl max-w-xl">
                <AlertTriangle className="w6 inline-block mx-2" />
                <div className="text-sm">
                  Timings may vary during holidays or university events, and
                  users are advised to check for updates on the university
                  website or LMS platform.
                </div>
              </p>
            </div>
          </li>
          <li>
            <h3 className="font-bold"> Book Renewal & Return </h3>
            <ul className="list-disc ml-4 flex flex-col gap-2">
              <li>
                Borrowed books can be renewed via the LMS platform (if no other
                users have placed a hold on the item).
              </li>
              <li>
                All borrowed materials must be returned on or before the due
                date to avoid penalties.
              </li>
              <p className="px-2 py-1 w-fit flex justify-center items-center bg-red-200/40 border-2 border-red-400 rounded-xl max-w-xl">
                <AlertTriangle className="w6 inline-block mx-2" />
                <div className="text-sm">
                  Failure to return items on time will result in the suspension
                  of borrowing privileges until the items are returned.
                </div>
              </p>
            </ul>
          </li>
          <li>
            <h3 className="font-bold"> Library Fines and Penalties </h3>
            <p className="px-2 flex flex-col gap-2">
              {" "}
              Fines will be charged for overdue items as follows:
              <br />
              Books: ₹5 per day per book.
              <br />
              Reserved Books: ₹10 per day per book.
              <br />
              <p className="px-2 py-1 w-fit flex justify-center items-center bg-amber-200/40 border-2 border-amber-400 rounded-xl max-w-xl">
                <AlertTriangle className="w6 inline-block mx-2" />
                <div className="text-sm">
                  In case of damaged or lost items, the borrower will be
                  required to replace the item or pay the equivalent cost of the
                  book, along with an additional processing fee.{" "}
                </div>
              </p>
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default PoliciesPage;
