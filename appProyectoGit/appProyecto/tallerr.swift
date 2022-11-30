//
//  tallerr.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 07/11/22.
//

import UIKit

class tallerr: NSObject {
    
    var ident: String
    var descripcion: String
    var codigoTaller: String
    var nombreTaller: String
    
    init(ident: String, descripcion: String, codigoTaller: String, nombreTaller: String) {
        self.ident = ident
        self.descripcion = descripcion
        self.codigoTaller = codigoTaller
        self.nombreTaller = nombreTaller
    }
    

}
