import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./scss/index.scss";
import Store from "./store";
import { Provider } from "react-redux";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import AuthRoutes from "./protectedRoutes/AuthRoutes";
import PrivateRoutes from "./protectedRoutes/PrivateRoutes";
import RootLayout from "./layouts/RootLayout";
import DashboardMain from "./pages/Dashboard/DashboardMain";
import CategoriesMain from "./pages/Categories/CategoriesMain";
import AddCategories from "./pages/Categories/AddCategories";
import EditCategories from "./pages/Categories/EditCategories";
import AddSubCategories from "./pages/SubCategories/AddSubCategories";
import SubCategoriesMain from "./pages/SubCategories/SubCategoriesMain";
import EditSubCategories from "./pages/SubCategories/EditSubCategories";
import ProductMain from "./pages/Products/ProductMain";
import AddProduct from "./pages/Products/AddProduct";
import ManageUserMain from "./pages/ManageUser/ManageUserMain";
import AddUser from "./pages/ManageUser/AddUser";
import SetNewPassword from "./components/Auth/SetNewPassword";
import OrdersMain from "./pages/Orders/OrdersMain";
import CurrencyMain from "./pages/Currency/CurrencyMain";
import AddCurrency from "./pages/Currency/AddCurrency";
import AddOrder from "./pages/Orders/AddOrder";
import PurchaseMain from "./pages/Purchases/PurchaseMain";
import AddPurchase from "./pages/Purchases/AddPurchase";
import VendorMain from "./pages/Vendor/VendorMain";
import AddVendor from "./pages/Vendor/AddVendor";
import CustomersMain from "./pages/Customers/CustomersMain";
import AddCustomers from "./pages/Customers/AddCustomers";
import FAQsMain from "./pages/FAQs/FAQsMain";
import AddFAQs from "./pages/FAQs/AddFAQs";
import EditFAQs from "./pages/FAQs/EditFAQs";
import TermsMain from "./pages/Terms/TermsMain";
import AddTerms from "./pages/Terms/AddTerms";
import EditTerms from "./pages/Terms/EditTerms";
import PoliciesMain from "./pages/Policies/PoliciesMain";
import AddPolicies from "./pages/Policies/AddPolicies";
import EditPolicies from "./pages/Policies/EditPolicies";
import ServicePriceMain from "./pages/ServicePrice/ServicePriceMain";
import AddServicePrice from "./pages/ServicePrice/AddServicePrice";
import EditServicePrice from "./pages/ServicePrice/EditServicePrice";

import ContactMain from "./pages/Contacts/ContactMain";
import EditContact from "./pages/Contacts/EditContact";
// import EditServicePrice from "./pages/ServicePrice/EditServicePrice";

import DealsMain from "./pages/Deals/DealsMain";
import AddDeals from "./pages/Deals/AddDeals";
import EditDeals from "./pages/Deals/EditDeals";
import AddWorkImages from "./pages/WorkSectionImages/AddWorkImages";


function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route
            element={
              <RootLayout>
                <PrivateRoutes />
              </RootLayout>
            }
          >
            {/* <Route path="/dashboard" exact element={<DashboardMain />} /> */}
            <Route path="/categories" exact element={<CategoriesMain />} />
            <Route path="/service-price" exact element={<ServicePriceMain />} />
            <Route path="/add-service-price" exact element={<AddServicePrice />} />
            <Route path="/edit-service-price/:id" exact element={<EditServicePrice />} />

            <Route path="/contact" exact element={<ContactMain />} />
            <Route path="/edit-contact/:id" exact element={<EditContact />} />
            
            <Route path="/deals" exact element={<DealsMain />} />
            <Route path="/add-deals" exact element={<AddDeals />} />
            <Route path="/edit-deals/:id" exact element={<EditDeals />} />
            <Route path="/work-images" exact element={<AddWorkImages />} />

            


            <Route path="/faqs" exact element={<FAQsMain />} />
            <Route path="/add-faqs" exact element={<AddFAQs />} />
            <Route path="/edit-faqs/:id" exact element={<EditFAQs />} />
            <Route path="/terms" exact element={<TermsMain />} />
            <Route path="/add-terms" exact element={<AddTerms />} />
            <Route path="/edit-terms/:id" exact element={<EditTerms />} />

            <Route path="/policies" exact element={<PoliciesMain />} />
            <Route path="/add-policies" exact element={<AddPolicies />} />
            <Route path="/edit-policies/:id" exact element={<EditPolicies />} />

            <Route path="/add-categories" exact element={<AddCategories />} />
            <Route
              path="/sub-categories"
              exact
              element={<SubCategoriesMain />}
            />
            <Route
              path="/add-sub-categories"
              exact
              element={<AddSubCategories />}
            />
            <Route
              path="/edit-categories/:id"
              exact
              element={<EditCategories />}
            />
            <Route
              path="/edit-sub-categories/:id"
              exact
              element={<EditSubCategories />}
            />
            <Route path="/products" exact element={<ProductMain />} />
            <Route path="/add-product" exact element={<AddProduct />} />
            <Route
              path="/edit-product/:productId"
              exact
              element={<AddProduct />}
            />
            <Route path="/manage-users" exact element={<ManageUserMain />} />
            <Route path="/add-user" exact element={<AddUser />} />
            <Route path="/edit-user/:userId" exact element={<AddUser />} />

            <Route path="/orders" exact element={<OrdersMain />} />
            <Route path="/add-order" exact element={<AddOrder />} />
            <Route path="/edit-order/:orderId" exact element={<AddOrder />} />

            <Route path="/manage-currency" exact element={<CurrencyMain />} />
            <Route path="/add-currency" exact element={<AddCurrency />} />
            <Route
              path="/edit-currency/:currencyId"
              exact
              element={<AddCurrency />}
            />

            <Route path="/manage-customers" exact element={<CustomersMain />} />
            <Route path="/add-customers" exact element={<AddCustomers />} />
            <Route
              path="/edit-customer/:customerId"
              exact
              element={<AddCustomers />}
            />

            <Route path="/manage-vendor" exact element={<VendorMain />} />
            <Route path="/add-vendor" exact element={<AddVendor />} />
            <Route
              path="/edit-vendor/:vendorId"
              exact
              element={<AddVendor />}
            />

            <Route path="/purchase" exact element={<PurchaseMain />} />
            <Route path="/add-purchase" exact element={<AddPurchase />} />
            <Route
              path="/edit-purchase/:purchaseId"
              exact
              element={<AddPurchase />}
            />
          </Route>

          <Route path="/" element={<AuthRoutes />}>
            <Route index element={<Login />} />
          </Route>

          <Route
            path="/users/:id/set-new-password/:token"
            element={<SetNewPassword />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
