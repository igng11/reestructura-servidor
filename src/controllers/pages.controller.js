export class PagesController{
    static renderShop = async (req, res) => {
        try {
            const {limit=10,page=1,num,sort="asc"} = req.query;
            // console.log(limit, page,num,sort);
            const numValue = num === 0 ? undefined : parseInt(num);
            if(!["asc","desc"].includes(sort)){
                return res.render("shop",{error:"Orden no valido"})
            };
            const sortValue = sort === "asc" ? 1 : -1;
            let query = {};
            if (numValue) {
                query.num = { $gte: numValue }; //filtro por propiedad num
                query.price = price; // Agregar el filtro por precio (no uso categorias aun)
            }
        
            const result = await productDao.getWithPaginate(query,{
                page,
                limit,
                sort:{num:sortValue},
                lean: true
            });
            // console.log(result);
            //      http//localhost:8080
            const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
              // Construir el objeto de respuesta
              const resultProductViews = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage:result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
                nextLink: result.hasNextPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`)}` : null,
              };
            //   console.log(resultProductViews);
              res.render("shop",resultProductViews);
                // res.render("shop",{products: result});
        } catch (error) {
            res.render("shop",{error:"no es posible visualizar los datos"});
        }
        };

    static renderEssential = (req, res) => {
        res.render("essential");
    };

    static renderAbout = (req, res) => {
        res.render("about");
    };
    
    static renderContact = (req, res) => {
        res.render("contact");
    }
    }